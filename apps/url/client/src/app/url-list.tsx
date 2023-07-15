import { Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { Shortened } from './types';
import QRCode from "react-qr-code";

type UrlListProps = {
  urls: Array<Shortened>;
};

export const UrlList: React.FC<UrlListProps> = ({ urls }) => {
  return (
    <UnorderedList id="urlList" textAlign="left">
      {urls.map((u) => (
        <ListItem>
          <Link href={u.short} color="teal.500">
            {u.short}
          </Link>{' '}
          - {u.original}
          <QRCode value={u.short} />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default UrlList;