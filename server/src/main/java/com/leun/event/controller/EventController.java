package com.leun.event.controller;

import com.leun.event.dto.EventDto;
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
public class EventController {

    @GetMapping("/event/{event-id}")
    public ResponseEntity<EventDto.Get> getEvent(@PathVariable("event-id") Integer eventId) {

        return ResponseEntity.ok(new EventDto.Get());
    }

    @PostMapping("/event")
    public ResponseEntity<String> createEvent(@RequestBody EventDto.Post eventDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body("Event Created Successfully");
    }


    @PatchMapping("/event/edit/{event-id}")
    public ResponseEntity<String> updateEvent(@RequestBody EventDto.Post eventDto,
        @PathVariable("event-id") Integer eventId) {

        return ResponseEntity.status(HttpStatus.OK).body("Event Created Successfully");
    }

    @DeleteMapping("event/{event-id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("event-id") Integer eventId) {

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Event Deleted Successfully");
    }
}
