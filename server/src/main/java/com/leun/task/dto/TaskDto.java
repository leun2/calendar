package com.leun.task.dto;

import com.leun.task.entity.Task;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

public class TaskDto {

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private LocalDateTime dueDate;
        private Boolean isCompleted;

        public Response(Long id, String title, String description, LocalDateTime dueDate,
            Boolean isCompleted) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.isCompleted = isCompleted;
        }

        public static Response fromEntity(Task task) {
            return new Response(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getIsCompleted()
            );
        }
    }

    @Getter
    @Setter
    public static class Request {
        private String title;
        private String description;
        private LocalDateTime dueDate;
        private Boolean isCompleted;
    }
}
