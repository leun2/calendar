package com.leun.calendar;

import com.leun.calendar.controller.CalendarController;
import com.leun.calendar.dto.CalendarDto;
import com.leun.calendar.service.CalendarService;
import com.leun.event.dto.EventDto;
import com.leun.task.dto.TaskDto;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = CalendarController.class)
public class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CalendarService calendarService;

    @Test
    @WithMockUser(username = "lee@example.com")
    public void getCalendarTest() throws Exception {

        CalendarDto calendarDto = new CalendarDto(
            List.of(new EventDto.Response(1L, "Event 1", "Description 1", "Location 1", null, null, "#FFFFFF")),
            List.of(new TaskDto.Response(1L, "Task 1", "Description 1", null, false))
        );

        when(calendarService.findCalendar("lee@example.com")).thenReturn(calendarDto);

        mockMvc.perform(get("/v1/calendar"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.events[0].id").value(1L))
            .andExpect(jsonPath("$.events[0].title").value("Event 1"))
            .andExpect(jsonPath("$.tasks[0].id").value(1L))
            .andExpect(jsonPath("$.tasks[0].title").value("Task 1"));
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void getCalendarByUnitTest() throws Exception {

        CalendarDto calendarDto = new CalendarDto(
            List.of(new EventDto.Response(1L, "Event 1", "Description 1", "Location 1", null, null, "#FFFFFF")),
            List.of(new TaskDto.Response(1L, "Task 1", "Description 1", null, false))
        );

        when(calendarService.findCalendarByUnit("lee@example.com", "month")).thenReturn(calendarDto);

        mockMvc.perform(get("/v1/calendar/{unit}", "month"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.events[0].id").value(1L))
            .andExpect(jsonPath("$.events[0].title").value("Event 1"))
            .andExpect(jsonPath("$.tasks[0].id").value(1L))
            .andExpect(jsonPath("$.tasks[0].title").value("Task 1"));
    }

    @Test
    @WithMockUser(username = "lee@example.com")
    public void getCalendarByDateTest() throws Exception {

        CalendarDto calendarDto = new CalendarDto(
            List.of(new EventDto.Response(1L, "Event 1", "Description 1", "Location 1", null, null, "#FFFFFF")),
            List.of(new TaskDto.Response(1L, "Task 1", "Description 1", null, false))
        );

        when(calendarService.findCalendarByDate("lee@example.com", "day", 2025, 3, 9)).thenReturn(calendarDto);

        mockMvc.perform(get("/v1/calendar/{unit}/{year}/{month}/{day}", "day", 2025, 3, 9))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.events[0].id").value(1L))
            .andExpect(jsonPath("$.events[0].title").value("Event 1"))
            .andExpect(jsonPath("$.tasks[0].id").value(1L))
            .andExpect(jsonPath("$.tasks[0].title").value("Task 1"));
    }
}
