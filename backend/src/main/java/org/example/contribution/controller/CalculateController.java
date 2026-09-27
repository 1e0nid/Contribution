package org.example.contribution.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.example.contribution.dto.api.DepositRequestDto;
import org.example.contribution.dto.api.DepositResponseDto;
import org.example.contribution.dto.business.DepositInput;
import org.example.contribution.dto.business.DepositOutput;
import org.example.contribution.service.CalculateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CalculateController {
    private final CalculateService calculateService;
    private static final Logger log = LoggerFactory.getLogger(CalculateController.class);

    @PostMapping("/calculate")
    public ResponseEntity<DepositResponseDto> resultCalculation(
            @Valid @RequestBody DepositRequestDto request) {
        log.info("called resultCalculation");
        DepositInput input = new DepositInput(request.amount(), request.months(), request.rate());
        DepositOutput output = calculateService.calculateDeposit(input);
        DepositResponseDto response = new DepositResponseDto(output.total(), output.profit());
        return ResponseEntity.ok(response);
    }
}
