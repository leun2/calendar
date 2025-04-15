package com.leun.calendar.service;

import com.leun.calendar.dto.CalendarDto;
import com.leun.event.dto.EventDto;
import com.leun.event.repository.EventRepository;
import com.leun.exception.InvalidDateException;
import com.leun.task.dto.TaskDto;
import com.leun.task.repository.TaskRepository;
import com.leun.user.entity.User;
import com.leun.user.service.UserService;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final UserService userService;
    private final EventRepository eventRepository;
    private final TaskRepository taskRepository;

    public CalendarDto findCalendar(String email) throws Exception {

        User user = userService.findUserByEmail(email);

//        List<EventDto.Response> events = getEvents(user, null, null);
//        List<TaskDto.Response> tasks = getTasks(user, null, null);

        List<EventDto.Response> events = eventRepository.findEventsByUser(user)
            .stream()
            .map(EventDto.Response::fromEntity)
            .toList();

        List<TaskDto.Response> tasks = taskRepository.findTasksByUser(user)
            .stream()
            .map(TaskDto.Response::fromEntity)
            .toList();

        return new CalendarDto(events, tasks);
    }

    public CalendarDto findCalendarByUnit(String email, String unit) throws Exception {

        User user = userService.findUserByEmail(email);

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime startDate = setStartDate(unit, now);
        LocalDateTime endDate = setEndDate(unit, now);

//        List<EventDto.Response> events = getEvents(user, startDate, endDate);
//        List<TaskDto.Response> tasks = getTasks(user, startDate, endDate);

        List<EventDto.Response> events = eventRepository.findEventsByUserAndPeriod(user, startDate, endDate)
            .stream()
            .map(EventDto.Response::fromEntity)
            .toList();

        List<TaskDto.Response> tasks = taskRepository.findTasksByUserAndPeriod(user, startDate, endDate)
            .stream()
            .map(TaskDto.Response::fromEntity)
            .toList();

        return new CalendarDto(events, tasks);
    }

    public CalendarDto findCalendarByDate(String email, String unit,
        Integer year, Integer month, Integer day) throws Exception {

        User user = userService.findUserByEmail(email);

        LocalDateTime date = getDate(year, month, day);

        LocalDateTime startDate = setStartDate(unit, date);
        LocalDateTime endDate = setEndDate(unit, date);

        List<EventDto.Response> events = eventRepository.findEventsByUserAndPeriod(user, startDate, endDate)
            .stream()
            .map(EventDto.Response::fromEntity)
            .toList();

        List<TaskDto.Response> tasks = taskRepository.findTasksByUserAndPeriod(user, startDate, endDate)
            .stream()
            .map(TaskDto.Response::fromEntity)
            .toList();

        return new CalendarDto(events, tasks);
    }

    public LocalDateTime setStartDate(String unit, LocalDateTime date) {
        return switch (unit.toLowerCase()) {
            case "year" -> date.with(TemporalAdjusters.firstDayOfYear());
            case "month" -> date.with(TemporalAdjusters.firstDayOfMonth());
            case "week" ->
                date.minusDays(date.getDayOfWeek().getValue() % 7); // 일요일 시작
//                date.minusDays(date.getDayOfWeek().getValue() - 1); // 월요일 시작

            case "day" -> date.toLocalDate().atStartOfDay();
            default -> throw new IllegalArgumentException("Invalid unit: " + unit);
        };
    }

    public LocalDateTime setEndDate(String unit, LocalDateTime date) {

        return switch (unit.toLowerCase()) {
            case "year" -> date.with(TemporalAdjusters.lastDayOfYear()).plusDays(1);
            case "month" -> date.with(TemporalAdjusters.lastDayOfMonth()).plusDays(1);
            case "week" -> {
//                LocalDateTime startDate = date.minusDays(date.getDayOfWeek().getValue() - 1);
                LocalDateTime startDate = date.minusDays((date.getDayOfWeek().getValue() % 7));
                yield startDate.plusDays(7);
            }
            case "day" -> date.toLocalDate().atTime(23, 59, 59);
            default -> throw new IllegalArgumentException("Invalid unit: " + unit);
        };
    }

//    public List<EventDto.Response> getEvents(User user, LocalDateTime startDate, LocalDateTime endDate) {
//        return user.getEvents().stream()
//            .filter(event -> {
//                if(startDate == null || endDate == null) {
//                    return true;
//                }
//                return (event.getStartTime().isAfter(startDate) || event.getStartTime().isEqual(startDate)) &&
//                    (event.getEndTime().isBefore(endDate) || event.getEndTime().isEqual(endDate));
//            })
//            .map(event -> new EventDto.Response(
//                event.getId(),
//                event.getTitle(),
//                event.getDescription(),
//                event.getLocation(),
//                event.getStartTime(),
//                event.getEndTime(),
//                String.valueOf(event.getColor())
//            ))
//            .collect(Collectors.toList());
//    }
//
//    public List<TaskDto.Response> getTasks(User user, LocalDateTime startDate, LocalDateTime endDate) {
//
//        return user.getTasks().stream()
//            .filter(task -> {
//                if(startDate == null || endDate == null) return true;
//                return (task.getDueDate().isAfter(startDate) || task.getDueDate().isEqual(startDate)) &&
//                    (task.getDueDate().isBefore(endDate) || task.getDueDate().isEqual(endDate));
//            })
//            .map(task -> new TaskDto.Response(
//                task.getId(),
//                task.getTitle(),
//                task.getDescription(),
//                task.getDueDate(),
//                task.getIsCompleted()
//            ))
//            .collect(Collectors.toList());
//    }

    public LocalDateTime getDate(Integer year, Integer month, Integer day) throws Exception {

        if (year < 1 || month < 1 || month > 12) {
            throw new InvalidDateException("Invalid Date");
        }

        YearMonth yearMonth = YearMonth.of(year, month);
        if (day < 1 || day > yearMonth.lengthOfMonth()) {
            throw new InvalidDateException("Invalid Date");
        }

        return LocalDateTime.of(year, month, day, 0, 0);
    }
}
