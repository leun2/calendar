package com.leun;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.leun.auth.dto.LoginDto;
import com.leun.auth.security.JwtUtil;
import com.leun.auth.service.AuthService;
import com.leun.calendar.service.CalendarService;
import com.leun.event.dto.EventDto;
import com.leun.event.entity.Event;
import com.leun.event.entity.Event.Color;
import com.leun.event.repository.EventRepository;
import com.leun.event.service.EventService;
import com.leun.task.dto.TaskDto;
import com.leun.task.entity.Task;
import com.leun.task.repository.TaskRepository;
import com.leun.task.service.TaskService;
import com.leun.user.dto.UserDto;
import com.leun.user.dto.UserDto.Request;
import com.leun.user.dto.UserProfileDto;
import com.leun.user.dto.UserProfileDto.Request.Name;
import com.leun.user.dto.UserSettingDto;
import com.leun.user.dto.UserSettingDto.Request.Language;
import com.leun.user.entity.User;
import com.leun.user.entity.User.ProviderType;
import com.leun.user.entity.User.UserRole;
import com.leun.user.entity.UserProfile;
import com.leun.user.entity.UserSetting;
import com.leun.user.repository.UserProfileRepository;
import com.leun.user.repository.UserRepository;
import com.leun.user.repository.UserSettingRepository;
import com.leun.user.service.UserService;
import java.time.LocalDateTime;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class CalendarApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private CalendarService calendarService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;
    @Autowired
    private UserSettingRepository userSettingRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private AuthService authService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    private final String email = "mock@test.com";
    private final String password = "1234";
    private String token;
    private Event event;

    @BeforeAll
    void init() {
        User user = new User(email, passwordEncoder.encode(password), ProviderType.LOCAL, UserRole.ROLE_USER);

        userRepository.save(user);
        userProfileRepository.save(new UserProfile(user, "lee", "/default"));
        userSettingRepository.save(new UserSetting(user, "Korean", "South Korea", "KST +09:00"));

        event = eventRepository.save(new Event(user, "mock event", "description", "location", LocalDateTime.now(), LocalDateTime.now().plusDays(1), Color.SAGE));
        taskRepository.save(new Task(user, "mock task", "description", LocalDateTime.now(), false));

        token = jwtUtil.generateToken(email);
    }

    @AfterAll
    void cleanUp() {
        userRepository.deleteAll();
    }

    @Test
    void registerUserTest() throws Exception {

        UserDto.Request request = new Request();
        request.setEmail("lee@mock.com");
        request.setPassword(password);
        request.setName("lee");

        mockMvc.perform(post("/v1/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    void loginTest() throws Exception {
        LoginDto.Request loginRequest = new LoginDto.Request();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        mockMvc.perform(post("/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("lee"))
            .andExpect(jsonPath("$.image").value("/default"))
            .andExpect(jsonPath("$.setting.language").value("Korean"))
            .andExpect(jsonPath("$.setting.country").value("South Korea"))
            .andExpect(jsonPath("$.setting.timezone").value("KST +09:00"))
            .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void getUserProfileTest() throws Exception {
        mockMvc.perform(get("/v1/user/profile")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("lee"))
            .andExpect(jsonPath("$.image").value("/default"));
    }

    @Test
    void updateUserProfileNameTest() throws Exception {

        UserProfileDto.Request.Name request = new Name();

        request.setName("lee");

        mockMvc.perform(patch("/v1/user/profile/name")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("lee"))
            .andExpect(jsonPath("$.image").value("/default"));
    }

    @Test
    public void updateUserSettingLanguage() throws Exception {

        UserSettingDto.Request.Language request = new Language();

        request.setLanguage("jp");

        mockMvc.perform(patch("/v1/user/setting/language")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.language").value("jp"))
            .andExpect(jsonPath("$.country").value("South Korea"))
            .andExpect(jsonPath("$.timezone").value("KST +09:00"));
    }

    @Test
    void createEventTest() throws Exception {

        EventDto.Request request = new EventDto.Request();
        request.setTitle("mock event");
        request.setDescription("mock description");
        request.setStartTime(LocalDateTime.now());
        request.setEndTime(LocalDateTime.now().plusMonths(13));
        request.setLocation("mock location");
        request.setColor(String.valueOf(Color.SAGE));

        mockMvc.perform(post("/v1/event")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk());
    }

    @Test
    void createTaskTest() throws Exception {

        TaskDto.Request request = new TaskDto.Request();
        request.setTitle("mock task");
        request.setDescription("mock description");
        request.setDueDate(LocalDateTime.now().plusDays(1));
        request.setIsCompleted(false);

        mockMvc.perform(post("/v1/task")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk());
    }

    @Test
    void updateEventTest() throws Exception {
        EventDto.Request request = new EventDto.Request();
        request.setTitle("mock event");
        request.setDescription("mock description");
        request.setStartTime(LocalDateTime.now());
        request.setEndTime(LocalDateTime.now().plusMonths(11));
        request.setLocation("mock location");
        request.setColor(String.valueOf(Color.SAGE));

        mockMvc.perform(put("/v1/event/{event-id}", event.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk());
    }

    @Test
    void getCalendarTest() throws Exception {

        mockMvc.perform(get("/v1/calendar")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.events[0].title").value("mock event"))
            .andExpect(jsonPath("$.events[0].color").value(String.valueOf(Color.SAGE)))
            .andExpect(jsonPath("$.tasks[0].title").value("mock task"));
    }
}
