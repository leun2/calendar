package com.leun.event.controller;

import com.leun.event.dto.EventDto;
import com.leun.event.service.EventService;
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
public class EventController {

    private final EventService eventService;

    @GetMapping("/event/{event-id}")
    public ResponseEntity<EventDto.Response> getEvent(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("event-id") Long id) throws Exception {

        EventDto.Response response = eventService.getEventById(id, userDetails.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/event")
    public void createEvent(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody EventDto.Request request) throws Exception {

        eventService.createEvent(userDetails.getUsername(), request);
    }


    @PutMapping("/event/{event-id}")
    public void updateEvent(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("event-id") Long id,
        @RequestBody EventDto.Request request) throws Exception {

        eventService.updateEventById(id, userDetails.getUsername(), request);
    }

    @DeleteMapping("event/{event-id}")
    public void deleteEvent(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("event-id") Long id) throws Exception {

        eventService.deleteEventById(id, userDetails.getUsername());
    }
}
