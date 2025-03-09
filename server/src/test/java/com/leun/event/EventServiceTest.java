package com.leun.event;

import com.leun.event.dto.EventDto;
import com.leun.event.dto.EventDto.Request;
import com.leun.event.entity.Event;
import com.leun.event.entity.Event.Color;
import com.leun.event.repository.EventRepository;
import com.leun.event.service.EventService;
import com.leun.exception.UnauthorizedAccessException;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import java.time.LocalDateTime;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.argThat;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.test.context.support.WithMockUser;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @InjectMocks
    private EventService eventService;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserService userService;

    private final String email = "lee@example.com";

    private Event event;


    @BeforeEach
    void setUp() {
        User user = new User();
        user.setEmail(email);

        event = new Event();
        event.setId(1L);
        event.setTitle("Meeting");
        event.setDescription("Team sync");
        event.setLocation("Room 101");
        event.setStartTime(LocalDateTime.now());
        event.setEndTime(LocalDateTime.now().plusHours(1));
        event.setColor(Color.BANANA);
        event.setUser(user);
    }

    @Test
    public void createEvent_whenUserIsExist() throws Exception {

        EventDto.Request request = new Request();
        request.setTitle("test title");
        request.setDescription("test description");
        request.setLocation("test location");
        request.setStartTime(LocalDateTime.now());
        request.setEndTime(LocalDateTime.now().plusDays(1));
        request.setColor(String.valueOf(Color.BANANA));

        User mockUser = new User();
        mockUser.setEmail(email);
        when(userService.findUserByEmail(anyString())).thenReturn(mockUser);

        eventService.createEvent(email, request);

        verify(eventRepository).save(argThat(event ->
            "test title".equals(event.getTitle()) && "test description".equals(
                event.getDescription()))
        );
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void getEventById_shouldReturnEventDto() throws Exception {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        EventDto.Response response = eventService.getEventById(1L, "lee@example.com");

        assertThat(response).isNotNull();
        assertThat(response.getTitle()).isEqualTo("Meeting");
        verify(eventRepository).findById(1L);
    }

    @Test
    public void getEventById_shouldThrowUnauthorizedAccessException() {
        User user = new User();
        user.setEmail("other@example.com");
        event.setUser(user);

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        assertThrows(
            UnauthorizedAccessException.class,
            () -> eventService.getEventById(1L, "lee@example.com"));
    }


    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void findEventById_shouldReturnEvent() throws Exception {

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        Event result = eventService.findEventById(1L);

        assertNotNull(result);
        assertEquals(event, result);

        verify(eventRepository, times(1)).findById(1L);
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void updateEventById_whenUserIsExist() throws Exception {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        EventDto.Request request = new Request();

        request.setTitle("Updated Meeting");
        request.setDescription("Updated Description");
        request.setLocation("Room 202");
        request.setStartTime(LocalDateTime.now());
        request.setEndTime(LocalDateTime.now().plusHours(2));
        request.setColor(Color.SAGE.toString());

        eventService.updateEventById(1L, "lee@example.com", request);

        verify(eventRepository).updateEvent(any(), any(), any(), any(), any(), any(), any());
    }


    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void deleteEventById_whenUserIsExist() throws Exception {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        eventService.deleteEventById(1L, "lee@example.com");

        verify(eventRepository).deleteById(1L);
    }

    @Test
    @WithMockUser(username = "lee@example.com", authorities = {"ROLE_USER"})
    public void deleteEventById_shouldThrowUnauthorizedAccessException() {
        User user = new User();
        user.setEmail("other@example.com");
        event.setUser(user);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        assertThrows(UnauthorizedAccessException.class,
            () -> eventService.deleteEventById(1L, "lee@example.com"));
    }
}
