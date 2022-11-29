export const updateStylePage = (isRTL: boolean) => {
    const link = document.getElementById('style-element') as HTMLElement;
    const body = (document.getElementsByTagName('html') as HTMLCollectionOf<HTMLElement>)[0];
    link.setAttribute('href', isRTL ? '/assets/css/style.rtl.css' : '/assets/css/style.css');
    body.setAttribute('direction', isRTL ? 'rtl' : 'ltr');
    body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    body.setAttribute('style', isRTL ? 'direction: rtl' : 'ltr');
}