// Отправка формы в Telegram через бота

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone) {
        alert('Пожалуйста, заполните обязательные поля Имя и Телефон.');
        return;
    }

    const token = 'ВАШ_ТОКЕН_БОТА_ТЕЛЕГРАМ';
    const chatId = 'ВАШ_CHAT_ID';

    const text = `
Новое сообщение с сайта Юниверсум:
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message || 'без сообщения'}
  `;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML',
                }),
            }
        );

        const data = await response.json();

        if (data.ok) {
            alert('Спасибо! Ваше сообщение отправлено.');
            form.reset();
        } else {
            alert('Ошибка отправки. Попробуйте позже.');
        }
    } catch (error) {
        alert('Ошибка сети. Попробуйте позже.');
    }
});
