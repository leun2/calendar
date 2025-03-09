package com.leun.calendar;

import com.leun.calendar.dto.CalendarDto;
import com.leun.calendar.service.CalendarService;
import com.leun.event.entity.Event;
import com.leun.event.repository.EventRepository;
import com.leun.exception.InvalidDateException;
import com.leun.task.entity.Task;
import com.leun.task.repository.TaskRepository;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import java.time.LocalDateTime;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class CalendarServiceTest {

    @InjectMocks
    private CalendarService calendarService;

    @Mock
    private UserService userService;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private TaskRepository taskRepository;

    @Test
    public void findCalendar_shouldReturnCalendarDto() throws Exception {

        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        Event event = new Event();
        Task task = new Task();;

        when(userService.findUserByEmail(email)).thenReturn(user);
        when(eventRepository.findEventsByUser(user)).thenReturn(List.of(event));
        when(taskRepository.findTasksByUser(user)).thenReturn(List.of(task));

        CalendarDto result = calendarService.findCalendar(email);

        assertNotNull(result);
        assertEquals(1, result.getEvents().size());
        assertEquals(1, result.getTasks().size());
    }

    @Test
    public void findCalendarByUnit_shouldReturnCalendarDto() throws Exception {

        String email = "test@example.com";
        User user = new User();
        String unit = "month";

        Event event = new Event();
        Task task = new Task();

        when(userService.findUserByEmail(email)).thenReturn(user);
        when(eventRepository.findEventsByUserAndPeriod(eq(user), any(), any())).thenReturn(List.of(event));
        when(taskRepository.findTasksByUserAndPeriod(eq(user), any(), any())).thenReturn(List.of(task));

        CalendarDto result = calendarService.findCalendarByUnit(email, unit);

        assertNotNull(result);
        assertEquals(1, result.getEvents().size());
        assertEquals(1, result.getTasks().size());
    }

    @Test
    public void findCalendarByDate_shouldReturnCalendarDto() throws Exception {

        String email = "test@example.com";
        User user = new User();
        String unit = "day";
        Integer year = 2025;
        Integer month = 3;
        Integer day = 9;
        Event event = new Event();
        Task task = new Task();

        LocalDateTime date = LocalDateTime.of(year, month, day, 0, 0, 0, 0);
        LocalDateTime startDate = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDate = startDate.withHour(23).withMinute(59).withSecond(59);

        when(userService.findUserByEmail(email)).thenReturn(user);
        when(eventRepository.findEventsByUserAndPeriod(user, startDate, endDate)).thenReturn(List.of(event));
        when(taskRepository.findTasksByUserAndPeriod(user, startDate, endDate)).thenReturn(List.of(task));

        CalendarDto result = calendarService.findCalendarByDate(email, unit, year, month, day);

        assertNotNull(result);
        assertEquals(1, result.getEvents().size());
        assertEquals(1, result.getTasks().size());
    }

    @Test
    public void setStartDate_whenUnitIsValid() {

        LocalDateTime date = LocalDateTime.of(2025, 3, 9, 15, 30, 0, 0);

        assertNotEquals(LocalDateTime.of(2025, 1, 1, 0, 0, 0, 0), calendarService.setStartDate("year", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 1, 0, 0, 0, 0), calendarService.setStartDate("month", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 9, 0, 0, 0, 0).minusDays(8), calendarService.setStartDate("week", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 10, 0, 0, 0, 0), calendarService.setStartDate("day", date));
    }

    @Test
    public void setStartDate_whenUnitIsInvalid() {

        LocalDateTime date = LocalDateTime.of(2025, 3, 9, 15, 30, 0, 0);

        assertThrows(IllegalArgumentException.class, () -> calendarService.setStartDate("invalid", date));
    }

    @Test
    public void setEndDate_whenUnitIsValid() {

        LocalDateTime date = LocalDateTime.of(2025, 3, 9, 15, 30, 0, 0);

        assertNotEquals(LocalDateTime.of(2025, 12, 31, 0, 0, 0, 0).plusDays(1), calendarService.setEndDate("year", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 31, 0, 0, 0, 0).plusDays(1), calendarService.setEndDate("month", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 9, 0, 0, 0, 0).plusDays(7), calendarService.setEndDate("week", date));
        assertNotEquals(LocalDateTime.of(2025, 3, 10, 0, 0, 0, 0), calendarService.setEndDate("day", date));
    }

    @Test
    public void setEndDate_whenUnitIsInvalid() {

        LocalDateTime date = LocalDateTime.of(2025, 3, 9, 15, 30, 0, 0);

        assertThrows(IllegalArgumentException.class, () -> calendarService.setEndDate("invalid", date));
    }

    @Test
    public void getDate_whenDateIsValid() throws Exception {

        Integer year = 2025;
        Integer month = 3;
        Integer day = 9;

        LocalDateTime result = calendarService.getDate(year, month, day);

        assertEquals(LocalDateTime.of(2025, 3, 9, 0, 0, 0, 0), result);
    }

    @Test
    public void getDate_whenDateIsInvalid() {

        Integer year = 2025;
        Integer month = 13;
        Integer day = 9;

        assertThrows(InvalidDateException.class, () -> calendarService.getDate(year, month, day));
    }
}
