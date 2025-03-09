package com.leun.calendar.dto;

import com.leun.event.dto.EventDto;
import com.leun.event.dto.EventDto.Response;
import com.leun.task.dto.TaskDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarDto {

    private List<EventDto.Response> events;
    private List<TaskDto.Response> tasks;

    public CalendarDto(List<Response> events, List<TaskDto.Response> tasks) {
        this.events = events;
        this.tasks = tasks;
    }
}
