// general page loading actions
export const SAGA_PAGE_LOAD = 'sagas/PAGE_LOAD';
export const SAGA_PAGE_UNLOAD = 'sagas/PAGE_UNLOAD';

export const onPageLoad = location => ({type: SAGA_PAGE_LOAD, location});
export const onPageUnload = () => ({type: SAGA_PAGE_UNLOAD});
