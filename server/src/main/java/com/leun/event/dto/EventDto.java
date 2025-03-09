package com.leun.event.dto;

import com.leun.event.entity.Event;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

public class EventDto {

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String title;
        private String description;
        private String location;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String color;

        public Response(Long id, String title, String description, String location,
            LocalDateTime startTime,
            LocalDateTime endTime, String color) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.location = location;
            this.startTime = startTime;
            this.endTime = endTime;
            this.color = color;
        }

        public static Response fromEntity(Event event) {
            return new Response(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getLocation(),
                event.getStartTime(),
                event.getEndTime(),
                String.valueOf(event.getColor())
            );
        }
    }

    @Getter
    @Setter
    public static class Request {
        private String title;
        private String description;
        private String location;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String color;
    }
}