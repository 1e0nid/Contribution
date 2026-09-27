package org.example.contribution.service;

import org.example.contribution.dto.business.DepositInput;
import org.example.contribution.dto.business.DepositOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@Service
public class CalculateService {
    private static final Logger log = LoggerFactory.getLogger(CalculateService.class);
    private static final MathContext MC = new MathContext(16, RoundingMode.HALF_UP);

    public DepositOutput calculateDeposit(DepositInput input) {
        log.info("called calculateDeposit");
        BigDecimal total = capitalizationFormula(input.amount(), input.months(), input.rate());
        BigDecimal profit = total.subtract(input.amount());
        return new DepositOutput(total, profit);
    }

    private BigDecimal capitalizationFormula(BigDecimal amount, Integer months, BigDecimal rate) {
        log.info("called capitalizationFormula with amount={}, months={}, rate={}", amount, months, rate);

        BigDecimal divisor = BigDecimal.valueOf(1200);
        BigDecimal monthlyRate = rate.divide(divisor, MC);

        BigDecimal factor = BigDecimal.ONE.add(monthlyRate, MC).pow(months, MC);

        return amount.multiply(factor, MC).setScale(2, RoundingMode.HALF_UP);
    }

}
