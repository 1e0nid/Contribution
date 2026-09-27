import React, { useState } from 'react';

interface CalculationRequest {
  amount: number;
  months: number;
  rate: number;
}

interface CalculationResponse {
  total: number;
  profit: number;
}

export const DepositCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('100000');
  const [months, setMonths] = useState<string>('12');
  const [rate, setRate] = useState<string>('8.5');

  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [initialAmount, setInitialAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = Number(amount);
    const numMonths = Number(months);
    const numRate = Number(rate);

    // Валидация (числа > 0)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Сумма вклада должна быть больше 0');
      return;
    }
    if (isNaN(numMonths) || numMonths <= 0 || !Number.isInteger(numMonths)) {
      setError('Срок в месяцах должен быть целым положительным числом');
      return;
    }
    if (isNaN(numRate) || numRate <= 0) {
      setError('Годовая ставка должна быть больше 0');
      return;
    }

    const payload: CalculationRequest = {
      amount: numAmount,
      months: numMonths,
      rate: numRate,
    };

    setIsLoading(true);

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении расчета на сервере');
      }

      const data: CalculationResponse = await response.json();
      setResult(data);
      setInitialAmount(numAmount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла непредвиденная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Калькулятор вклада</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Сумма вклада (₽):</label>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Срок (месяцы):</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Годовая ставка (%):</label>
          <input
            type="number"
            step="any"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isLoading ? 'Расчет...' : 'Рассчитать'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '12px' }}>
          {error}
        </div>
      )}

      {result && initialAmount !== null && (
        <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Результат:</h3>
          <p>Начальная сумма: <strong>{formatCurrency(initialAmount)}</strong></p>
          <p>Итоговая сумма: <strong>{formatCurrency(result.total)}</strong></p>
          <p>Доход: <strong>{formatCurrency(result.profit)}</strong></p>
        </div>
      )}
    </div>
  );
};