import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const useRouteParams = () => {
  const location = useLocation();
  const params = useParams<{ page?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const detailsId = searchParams.get('details');
    setName(searchParams.get('name'));
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page));
    }

    if (detailsId) {
      setSelectedId(detailsId);
    } else {
      setSelectedId(null);
    }
  }, [location.search]);

  useEffect(() => {
    if (params.page) {
      setCurrentPage(parseInt(params.page));
      return;
    }
  }, [params]);

  return { currentPage, selectedId, name };
};

export default useRouteParams;
