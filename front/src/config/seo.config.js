const SITE_NAME = 'Bank - Vanila JS'

export const getTitle = (title) => {
    return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}