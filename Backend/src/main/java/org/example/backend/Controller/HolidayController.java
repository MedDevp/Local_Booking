package org.example.backend.Controller;

import org.example.backend.DTO.HolidayDTO;
import org.example.backend.Service.ApiService;
import org.example.backend.Service.HolidayService;
import org.example.backend.model.Holiday;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")

public class HolidayController {
    private final ApiService apiService;
    private final HolidayService holidayService;

    public HolidayController(ApiService apiService, HolidayService holidayService) {
        this.apiService = apiService;
        this.holidayService = holidayService;
    }

    @GetMapping("/fetch-and-save")
    public List<Holiday> fetchAndSaveHolidays() {
        String apiUrl = "https://date.nager.at/api/v3/PublicHolidays/2024/MA";
        List<HolidayDTO> holidayDTOs = apiService.fetchHolidays(apiUrl);
        if (holidayDTOs != null) {
            return holidayService.saveHolidays(holidayDTOs);
        } else {
            // Handle error appropriately
            return null;
        }
    }

    @GetMapping("/holidays")
    public List<Holiday> getHolidays() {
        return holidayService.findAll();
    }
}
