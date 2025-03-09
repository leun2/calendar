package com.leun.task.controller;

import com.leun.task.dto.TaskDto;
import com.leun.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/task/{task-id}")
    public ResponseEntity<TaskDto.Response> getTask(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("task-id") Long id) throws Exception {

        TaskDto.Response response = taskService.getTaskById(id, userDetails.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/task")
    public void createTask(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody TaskDto.Request request) throws Exception {

        taskService.createTask(userDetails.getUsername(), request);
    }


    @PutMapping("/task/{task-id}")
    public void updateTask(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody TaskDto.Request request,
        @PathVariable("task-id") Long id) throws Exception {

        taskService.updateTaskById(id, userDetails.getUsername(), request);
    }

    @DeleteMapping("task/{task-id}")
    public void deleteTask(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("task-id") Long id) throws Exception {

        taskService.deleteTaskById(id, userDetails.getUsername());
    }
}
