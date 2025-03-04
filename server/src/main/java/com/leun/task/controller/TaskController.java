package com.leun.task.controller;

import com.leun.task.dto.TaskDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class TaskController {

    @GetMapping("/task/{task-id}")
    public ResponseEntity<TaskDto.Get> getTask(@PathVariable("task-id") Long taskId) {

        return ResponseEntity.ok(new TaskDto.Get());
    }

    @PostMapping("/task")
    public ResponseEntity<String> createTask(@RequestBody TaskDto.Post taskDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body("Task Created Successfully");
    }


    @PatchMapping("/task/edit/{task-id}")
    public ResponseEntity<String> updateTask(@RequestBody TaskDto.Post taskDto,
        @PathVariable("task-id") Integer taskId) {

        return ResponseEntity.status(HttpStatus.OK).body("Task Created Successfully");
    }

    @DeleteMapping("task/{task-id}")
    public ResponseEntity<String> deleteTask(@PathVariable("task-id") Integer taskId) {

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Task Deleted Successfully");
    }
}
