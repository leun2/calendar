package com.leun.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leun.task.controller.TaskController;
import com.leun.task.dto.TaskDto;
import com.leun.task.dto.TaskDto.Request;
import com.leun.task.service.TaskService;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "lee@example.com")
    public void getTaskTest() throws Exception {

        when(taskService.getTaskById(1L, "lee@example.com")).thenReturn(
            new TaskDto.Response(1L, "Test Task", "This is a test task", LocalDateTime.now(), false)
        );

        mockMvc.perform(get("/v1/task/{task-id}", 1L))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1L))
            .andExpect(jsonPath("$.title").value("Test Task"))
            .andExpect(jsonPath("$.description").value("This is a test task"))
            .andExpect(jsonPath("$.isCompleted").value(false));

        verify(taskService, times(1)).getTaskById(1L, "lee@example.com");
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void createTaskTest() throws Exception {

        TaskDto.Request request = new Request();

        request.setTitle("New Task");
        request.setDescription("This is a new task");
        request.setDueDate(LocalDateTime.now().plusDays(1));
        request.setIsCompleted(false);

        doNothing().when(taskService).createTask("lee@example.com", request);

        mockMvc.perform(post("/v1/task")
                .with(csrf())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void updateTaskTest() throws Exception {
        TaskDto.Request request = new Request();
        request.setTitle("Updated Task");
        request.setDescription("This task has been updated");
        request.setDueDate(LocalDateTime.now().plusDays(1));
        request.setIsCompleted(true);

        mockMvc.perform(put("/v1/task/{task-id}", 1L)
                .with(csrf())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void deleteTaskTest() throws Exception {
        mockMvc.perform(delete("/v1/task/{task-id}", 1L)
                .with(csrf()))
            .andExpect(status().isOk());

        verify(taskService, times(1)).deleteTaskById(1L, "lee@example.com");
    }
}
