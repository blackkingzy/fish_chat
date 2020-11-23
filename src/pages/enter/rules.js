export const useRules = (locale, t, type) => {
    const room_No = [
        {
            required: true,
            message: t('message.enter.M001', {}, { locale: locale }),
        },
    ]
    const user_name = [
        {
            required: true,
            message: t('message.enter.M002', {}, { locale: locale }),
        },
    ]
    if (type === 'enter') {
        return { room_No, user_name }
    }
    return { user_name }
}
