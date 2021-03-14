export const useRules = (t, type) => {
    const room_No = [
        {
            required: true,
            message: t('message.enter.M001'),
        },
    ]
    const user_name = [
        {
            required: true,
            message: t('message.enter.M002'),
        },
    ]
    if (type === 'enter') {
        return { room_No, user_name }
    }
    return { user_name }
}
