package com.leun.event;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leun.event.controller.EventController;
import com.leun.event.dto.EventDto;
import com.leun.event.dto.EventDto.Request;
import com.leun.event.entity.Event.Color;
import com.leun.event.service.EventService;
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
@WebMvcTest(controllers = EventController.class)
public class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EventService eventService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "lee@example.com")
    public void getEventTest() throws Exception {

        when(eventService.getEventById(1L, "lee@example.com")).thenReturn(
            new EventDto.Response(1L, "Test Event", "This is a test event", "Test Location",
                LocalDateTime.now(), LocalDateTime.now().plusHours(1), Color.TOMATO.getHexCode())
        );

        mockMvc.perform(get("/v1/event/{event-id}", 1L))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1L))
            .andExpect(jsonPath("$.title").value("Test Event"))
            .andExpect(jsonPath("$.description").value("This is a test event"))
            .andExpect(jsonPath("$.location").value("Test Location"))
            .andExpect(jsonPath("$.startTime").exists())
            .andExpect(jsonPath("$.endTime").exists())
            .andExpect(jsonPath("$.color").value("#FF6347"));

        verify(eventService, times(1)).getEventById(1L, "lee@example.com");
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void createEventTest() throws Exception {

        EventDto.Request request = new Request();
        request.setTitle("New Event");
        request.setDescription("This is a new event");
        request.setLocation("New Location");
        request.setStartTime(LocalDateTime.now().plusDays(1));
        request.setEndTime(LocalDateTime.now().plusDays(1).plusHours(2));
        request.setColor("TOMATO");

        doNothing().when(eventService).createEvent("lee@example.com", request);

        mockMvc.perform(post("/v1/event")
                .with(csrf())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void updateEventTest() throws Exception {

        EventDto.Request request = new Request();
        request.setTitle("Updated Event");
        request.setDescription("This event has been updated");
        request.setLocation("Updated Location");
        request.setStartTime(LocalDateTime.now().plusDays(2));
        request.setEndTime(LocalDateTime.now().plusDays(2).plusHours(2));
        request.setColor("TANGERINE");

        mockMvc.perform(put("/v1/event/{event-id}", 1L)
                .with(csrf())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void deleteEventTest() throws Exception {

        mockMvc.perform(delete("/v1/event/{event-id}", 1L)
                .with(csrf()))
            .andExpect(status().isOk());

        verify(eventService, times(1)).deleteEventById(1L, "lee@example.com");
    }
}
