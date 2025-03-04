package com.leun.calendar.controller;

import com.leun.calendar.dto.CalendarDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class CalendarController {

    @GetMapping("/calendar")
    public ResponseEntity<CalendarDto> getCalendar() {

        return ResponseEntity.ok(new CalendarDto());
    }

    @GetMapping("/calendar/{unit}")
    public ResponseEntity<CalendarDto> getCalendarByUnit(@PathVariable("unit") String unit) {

        return ResponseEntity.ok(new CalendarDto());
    }

    @GetMapping("/calendar/{unit}/{year}/{month}/{day}")
    public ResponseEntity<CalendarDto> getCalendarByDate(@PathVariable("unit") String unit,
        @PathVariable("year") int year, @PathVariable("month") int month, @PathVariable("day") int day) {

        return ResponseEntity.ok(new CalendarDto());
    }
}
