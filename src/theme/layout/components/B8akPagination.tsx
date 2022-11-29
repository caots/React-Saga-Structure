import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { Languages } from '../../../app/utils/common/constants';
import { useAppSelector } from '../../../setup/redux/Hooks';

function getNumberOfPages(rowCount: any, rowsPerPage: any) {
  return Math.ceil(rowCount / rowsPerPage);
}

export function B8akPagination(
  event: any
) {
  // const language = useAppSelector(selectLanguage);
  // const rtlMode = language === Languages.ar ? true : false;

  const handlePageSize = (e: any) => {
    event.onChangeRowsPerPage(Number(e.target.value));
  };

  const pages = getNumberOfPages(event.rowCount, event.rowsPerPage);
  let currentItems = event.currentPage * event.rowsPerPage <= event.rowCount ? event.currentPage * event.rowsPerPage : event.rowCount;

  const handlePageClick = (eventPaging: any) => {
    event.onChangePage(Number(eventPaging.selected + 1));
  };

  const { t } = useTranslation();
  return (
    <div className='d-flex justify-content-between mt-10 mb-5' >

      <div className='d-flex'>
        <select className='form-select page-size' value={event.rowsPerPage} onChange={handlePageSize}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>


        <ReactPaginate
          className='pagination'
          pageClassName="page-item"
          previousClassName="nav-item"
          nextClassName="nav-item"
          breakClassName="break-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
          breakLabel="..."
          nextLabel={<i className="fas fa-chevron-right"></i>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pages}
          previousLabel={<i className="fas fa-chevron-left"></i>}
          forcePage={event.currentPage - 1}
        />

      </div>

      <div>
        {event.currentPage > 1 ? (event.currentPage - 1) * event.rowsPerPage : 1} - {currentItems} {t('PAGINATION.OF')} {event.rowCount} {t('PAGINATION.ITEMS')}
      </div>
    </div>

  );
};