# Интеграция CITYIDOL в Blazor

## Файлы

| Файл | Куда копировать |
|---|---|
| `CityIdol.razor` | `Pages/` или `Components/` |
| `cityidol-interop.js` | `wwwroot/` |

## Быстрый старт

### 1. Скопируйте файлы
```
CityIdol.razor → YourBlazorApp/Pages/CityIdol.razor
cityidol-interop.js → YourBlazorApp/wwwroot/cityidol-interop.js
```

### 2. Укажите URL сайта в компоненте
Откройте `CityIdol.razor` и замените:
```
[Parameter] public string SiteUrl { get; set; } = "https://ВАШ-ДОМЕН.poehali.dev";
```

### 3. Используйте компонент в страницах

**Полная страница с сайтом:**
```razor
@page "/dance"

<CityIdol SiteUrl="https://cityidol.poehali.dev" Height="100vh" />
```

**Только секция цен:**
```razor
<CityIdol
    SiteUrl="https://cityidol.poehali.dev"
    Section="prices"
    Height="800px"
    BorderRadius="16px"
    OnPaymentConfirmed="HandlePayment" />

@code {
    private async Task HandlePayment(CityIdol.PaymentEventArgs e)
    {
        Console.WriteLine($"Оплата подтверждена: {e.PlanName} — {e.Amount} ₽");
        // Ваша логика: сохранить в БД, отправить email и т.д.
    }
}
```

**Управление программно:**
```razor
<CityIdol @ref="_cityidol" SiteUrl="https://cityidol.poehali.dev" />
<button @onclick="GoToPrices">Перейти к ценам</button>

@code {
    private CityIdol? _cityidol;

    private async Task GoToPrices()
    {
        if (_cityidol != null)
            await _cityidol.ScrollToSection("prices");
    }
}
```

## Параметры компонента

| Параметр | Тип | По умолчанию | Описание |
|---|---|---|---|
| `SiteUrl` | string | — | URL задеплоенного сайта |
| `Section` | string | `""` | Секция для скролла при открытии |
| `Height` | string | `"100vh"` | Высота iframe |
| `WrapperClass` | string | `""` | CSS класс обёртки |
| `BorderRadius` | string | `"0px"` | Скругление углов |
| `OnPaymentConfirmed` | EventCallback | — | Событие при подтверждении СБП |

## Доступные секции

`hero` · `about` · `services` · `trainers` · `schedule` · `prices` · `reviews` · `faq` · `contacts`
