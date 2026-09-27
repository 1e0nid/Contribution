package org.example.contribution.dto.api;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record DepositRequestDto(
        @NotNull(message = "Сумма обязательна")
        @DecimalMin(value = "1000.00", message = "Минимальная сумма - 1 000")
        @DecimalMax(value = "10000000.00", message = "Максимальная сумма - 10 000 000")
        BigDecimal amount,

        @NotNull(message = "Срок обязателен")
        @Min(value = 1, message = "Минимальный срок - 1 месяц")
        @Max(value = 60, message = "Максимальный срок - 60 месяцев")
        Integer months,

        @NotNull(message = "Ставка обязательна")
        @DecimalMin(value = "1.00", message = "Минимальная ставка - 1%")
        @DecimalMax(value = "20.00", message = "Максимальная ставка - 20%")
        BigDecimal rate
) {}