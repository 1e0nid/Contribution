# Калькулятор вклада

Веб-приложение для расчёта итоговой суммы и дохода по вкладу с ежемесячной капитализацией процентов.

- **Backend:** Java 21, Spring Boot 4.1.1 (Web, Validation), Lombok
- **Frontend:** React + TypeScript, Vite

## Формула расчёта

```
Итог = Сумма × (1 + Ставка / 100 / 12) ^ Срок_в_месяцах
Доход = Итог − Сумма
```

Расчёт выполняется в `BigDecimal` (`MathContext`, 16 значащих цифр, `HALF_UP`), итог округляется до 2 знаков после запятой.

## API

### `POST /api/calculate`

**Request**

```json
{
  "amount": 100000,
  "months": 12,
  "rate": 8.5
}
```

| Поле     | Тип     | Ограничения                  |
|----------|---------|-------------------------------|
| `amount` | number  | от 1 000 до 10 000 000        |
| `months` | integer | от 1 до 60                    |
| `rate`   | number  | от 1 до 20 (% годовых)        |

**Response** `200 OK`

```json
{
  "total": 108300.50,
  "profit": 8300.50
}
```

При нарушении ограничений возвращается ошибка валидации с описанием на русском языке.

## Структура backend

```
src/main/java/org/example/contribution/
├── controller/
│   └── CalculateController.java   # POST /api/calculate
├── service/
│   └── CalculateService.java      # формула расчёта
└── dto/
    ├── api/                       # DepositRequestDto, DepositResponseDto
    └── business/                  # DepositInput, DepositOutput
```

## Запуск

### Backend

```bash
cd contribution
./mvnw spring-boot:run
```

Сервер поднимется на `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev-сервер Vite (`http://localhost:5173`) проксирует все запросы `/api/*` на `http://localhost:8080` — настроено в `vite.config.ts`.

## Пример проверки (curl)

```bash
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"amount": 100000, "months": 12, "rate": 8.5}'
```
