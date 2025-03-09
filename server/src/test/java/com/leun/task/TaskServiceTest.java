package com.leun.task;

import com.leun.exception.UnauthorizedAccessException;
import com.leun.task.dto.TaskDto;
import com.leun.task.dto.TaskDto.Request;
import com.leun.task.entity.Task;
import com.leun.task.repository.TaskRepository;
import com.leun.task.service.TaskService;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserService userService;

    private final String email = "lee@example.com";

    @Test
    public void createTask_whenUserIsExist() throws Exception {

        TaskDto.Request request = new Request();
        request.setTitle("test title");
        request.setDescription("test description");
        request.setDueDate(LocalDateTime.now());
        request.setIsCompleted(false);

        when(userService.findUserByEmail(anyString())).thenReturn(any(User.class));

        taskService.createTask(email, request);

        verify(taskRepository).save(argThat(task ->
            "test title".equals(task.getTitle()) && "test description".equals(task.getDescription()))
        );
    }

    @Test
    public void getTaskById_shouldReturnTaskDto_whenUserIsAuthorized() throws Exception {

        Long taskId = 1L;

        User mockUser = new User();
        mockUser.setEmail(email);

        Task mockTask = new Task();
        mockTask.setId(taskId);
        mockTask.setTitle("Test Task");
        mockTask.setDescription("Task Description");
        mockTask.setDueDate(LocalDateTime.now());
        mockTask.setIsCompleted(false);
        mockTask.setUser(mockUser);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));

        TaskDto.Response result = taskService.getTaskById(taskId, email);

        assertNotNull(result);
        assertEquals(mockTask.getId(), result.getId());
        assertEquals(mockTask.getTitle(), result.getTitle());
        assertEquals(mockTask.getDescription(), result.getDescription());
        assertEquals(mockTask.getDueDate(), result.getDueDate());
        assertEquals(mockTask.getIsCompleted(), result.getIsCompleted());

        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    public void getTaskById_shouldThrowUnauthorizedAccessException_whenUserIsNotAuthorized() {

        Long taskId = 1L;
        String ownerEmail = "owner@example.com";
        String otherEmail = "other@example.com";

        User owner = new User();
        owner.setEmail(ownerEmail);

        Task mockTask = new Task();
        mockTask.setId(taskId);
        mockTask.setTitle("Test Task");
        mockTask.setDescription("Task Description");
        mockTask.setDueDate(LocalDateTime.now());
        mockTask.setIsCompleted(false);
        mockTask.setUser(owner);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));

        assertThrows(UnauthorizedAccessException.class, () -> {
            taskService.getTaskById(taskId, otherEmail);
        });

        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    public void getTaskById_shouldThrowNoSuchElementException_whenTaskDoesNotExist() {

        Long taskId = 999L;

        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            taskService.getTaskById(taskId, email);
        });

        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    public void findTaskById_shouldReturnTask() throws Exception {

        Long id = 1L;
        Task mockTask = new Task();
        when(taskRepository.findById(id)).thenReturn(Optional.of(mockTask));

        Task result = taskService.findTaskById(id);

        assertNotNull(result);
        assertEquals(mockTask, result);

        verify(taskRepository, times(1)).findById(id);
    }

    @Test
    public void updateTaskById_whenUserIsExist() throws Exception {

        Long taskId = 1L;

        User mockUser = new User();
        mockUser.setEmail(email);

        Task mockTask = new Task();
        mockTask.setId(taskId);
        mockTask.setTitle("Test Task");
        mockTask.setDescription("Task Description");
        mockTask.setDueDate(LocalDateTime.now());
        mockTask.setIsCompleted(false);
        mockTask.setUser(mockUser);

        TaskDto.Request request = new Request();
        request.setTitle(mockTask.getTitle());
        request.setDescription(mockTask.getDescription());
        request.setDueDate(mockTask.getDueDate());
        request.setIsCompleted(mockTask.getIsCompleted());

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));

        taskService.updateTaskById(taskId, email, request);

        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository, times(1))
            .updateTask(taskId,
                request.getTitle(),
                request.getDescription(),
                request.getDueDate(),
                request.getIsCompleted());
    }

    @Test
    public void deleteTaskById_whenUserIsExist() throws Exception {

        Long taskId = 1L;

        User mockUser = new User();
        mockUser.setEmail(email);

        Task mockTask = new Task();
        mockTask.setId(taskId);
        mockTask.setTitle("Test Task");
        mockTask.setDescription("Task Description");
        mockTask.setDueDate(LocalDateTime.now());
        mockTask.setIsCompleted(false);
        mockTask.setUser(mockUser);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));

        taskService.deleteTaskById(taskId, email);

        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository, times(1)).deleteById(taskId);
    }
}
