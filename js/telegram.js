document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");
    const status = document.getElementById("formStatus");

    // === Маска форматирования ===
    function formatPhone(numbers) {
        numbers = numbers.replace(/\D/g, "").substring(0, 11); // только цифры, максимум 11 (7 + 10)
        let result = "+7";
        if (numbers.length > 1) result += " (" + numbers.substring(1, 4);
        if (numbers.length >= 4) result += ")";
        if (numbers.length >= 4) result += " " + numbers.substring(4, 7);
        if (numbers.length >= 7) result += " - " + numbers.substring(7, 9);
        if (numbers.length >= 9) result += " - " + numbers.substring(9, 11);
        return result;
    }

    // === Обновление поля ввода ===
    function handleInput(e) {
        let digits = e.target.value.replace(/\D/g, "");

        // если ничего нет, оставить только "+7 ("
        if (digits.length === 0) {
            e.target.value = "+7 (";
            return;
        }

        // если первая цифра не 7, добавляем 7
        if (!digits.startsWith("7")) digits = "7" + digits;

        // ограничиваем длину (всего 11 цифр)
        digits = digits.substring(0, 11);

        // применяем формат
        e.target.value = formatPhone(digits);
    }

    // === Обработка Backspace (удаляем только цифры) ===
    phoneInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
            e.preventDefault();
            let digits = phoneInput.value.replace(/\D/g, "");

            // если длина больше 1, отрезаем последнюю цифру
            if (digits.length > 1) {
                digits = digits.slice(0, -1);
                phoneInput.value = formatPhone(digits);
            } else {
                // если все стерто — оставить только подложку
                phoneInput.value = "+7 (";
            }
            return;
        }

        // Разрешаем стрелки, Tab, Delete
        const allowedKeys = ["Delete", "ArrowLeft", "ArrowRight", "Tab"];
        if (allowedKeys.includes(e.key)) return;

        // Запрещаем всё кроме цифр
        if (!/\d/.test(e.key)) e.preventDefault();
    });

    // === Поведение при фокусе ===
    phoneInput.addEventListener("focus", () => {
        if (phoneInput.value.trim() === "") {
            phoneInput.value = "+7 (";
        }
    });

    // === При потере фокуса — если только подложка, очищаем ===
    phoneInput.addEventListener("blur", () => {
        if (phoneInput.value === "+7 (") {
            phoneInput.value = "";
        }
    });

    // === Автоформатирование при вводе ===
    phoneInput.addEventListener("input", handleInput);

    // === Отправка формы ===
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = "7712833268:AAGjUD1MA5rNr1QNBk6CYEaZhyLLbiDDbL0"; // вставь токен
        const chatId = "3144476595"; // вставь chat_id

        const name = form.name.value.trim();
        const phone = phoneInput.value.trim();
        const message = form.message.value.trim();

        if (!name || !phone || phone.replace(/\D/g, "").length < 11) {
            status.textContent = "Пожалуйста, заполните все поля корректно.";
            status.style.color = "red";
            return;
        }

        const text = `Новое сообщение с сайта Universum:\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text }),
            });

            const data = await response.json();
            if (data.ok) {
                status.textContent = "Спасибо! Ваше сообщение отправлено.";
                status.style.color = "green";
                form.reset();
                phoneInput.value = "+7 (";
            } else {
                status.textContent = "Ошибка при отправке. Попробуйте позже.";
                status.style.color = "red";
            }
        } catch (error) {
            status.textContent = "Ошибка сети. Попробуйте позже.";
            status.style.color = "red";
        }
    });
});
