package com.leun.event.service;

import com.leun.event.dto.EventDto;
import com.leun.event.entity.Event;
import com.leun.event.entity.Event.Color;
import com.leun.event.repository.EventRepository;
import com.leun.exception.UnauthorizedAccessException;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    @Transactional
    public void createEvent(String email, EventDto.Request request) throws Exception {

        User user = userService.findUserByEmail(email);

        eventRepository.save(
            new Event(user,
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getStartTime(),
                request.getEndTime(),
                Event.Color.valueOf(request.getColor())));
    }

    public EventDto.Response getEventById(Long id, String email) throws Exception {

        Event event = findEventById(id);

        if (!event.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("You are not authorized to view this event.");
        }

        return new EventDto.Response(id,
            event.getTitle(),
            event.getDescription(),
            event.getLocation(),
            event.getStartTime(),
            event.getEndTime(),
            event.getColor().getHexCode());
    }

    @Transactional
    public void updateEventById(Long id, String email, EventDto.Request request) throws Exception {

        Event event = findEventById(id);

        if (!event.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("You are not authorized to view this event.");
        }

        eventRepository.updateEvent(id,
            request.getTitle(),
            request.getDescription(),
            request.getLocation(),
            request.getStartTime(),
            request.getEndTime(),
            Color.valueOf(request.getColor()));
    }

    @Transactional
    public void deleteEventById(Long id, String email) throws Exception {

        Event event = findEventById(id);

        if (!event.getUser().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("You are not authorized to view this event.");
        }

        eventRepository.deleteById(id);
    }

    public Event findEventById(Long id) throws Exception {
        return eventRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Event Does Not Exist"));
    }
}
