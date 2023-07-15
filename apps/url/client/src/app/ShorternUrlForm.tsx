import { Button, Input } from '@chakra-ui/react';
import { FormEvent, useCallback, useState } from 'react';

type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
};

// eslint-disable-next-line no-useless-escape
const isValidUrl = (urlString: string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
  requestShortUrl,
}) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    async (event: FormEvent) => {
        if (isValidUrl(inputUrl)) {
            event.preventDefault();
            await requestShortUrl(inputUrl);
            setInputUrl('');
        } else {
            event.preventDefault();
        }
    },
    [inputUrl, requestShortUrl]
  );
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="url-input"
        size="lg"
        marginBlock={4}
        value={inputUrl}
        onChange={(e) => {
          setInputUrl(e.target.value);
        }}
        placeholder="www.my-super-long-url-here.com/12345"
      />
      <Button id="submit-btn" type="submit" colorScheme="teal" size="lg">
        Generate
      </Button>
    </form>
  );
};

export default ShortenUrlForm;