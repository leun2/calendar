package com.leun.task.service;

import com.leun.exception.UnauthorizedAccessException;
import com.leun.task.dto.TaskDto;
import com.leun.task.entity.Task;
import com.leun.task.repository.TaskRepository;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    @Transactional
    public void createTask(String email, TaskDto.Request request) throws Exception {

        User user = userService.findUserByEmail(email);

        taskRepository.save(
            new Task(user,
                request.getTitle(),
                request.getDescription(),
                request.getDueDate(),
                request.getIsCompleted()));
    }

    public TaskDto.Response getTaskById(Long id, String email) throws Exception {

        Task task = findTaskById(id);

        if (!task.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("Access Authority Does Not Exist");
        }

        return new TaskDto.Response(id,
            task.getTitle(),
            task.getDescription(),
            task.getDueDate(),
            task.getIsCompleted());
    }

    @Transactional
    public void updateTaskById(Long id, String email, TaskDto.Request request) throws Exception {

        Task task = findTaskById(id);

        if (!task.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("Access Authority Does Not Exist");
        }

        taskRepository.updateTask(id,
            request.getTitle(),
            request.getDescription(),
            request.getDueDate(),
            request.getIsCompleted());
    }

    @Transactional
    public void deleteTaskById(Long id, String email) throws Exception {
        Task task = findTaskById(id);

        if (!task.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("Access Authority Does Not Exist");
        }

        taskRepository.deleteById(id);
    }

    public Task findTaskById(Long id) throws Exception {
        return taskRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Task Does Not Exist"));
    }
}
