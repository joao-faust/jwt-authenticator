import { RequestErrorProps } from '../../models/types/errors';

class RequestError extends Error {
  status: number;

  constructor(props: RequestErrorProps) {
    super(props.message);
    this.status = props.status ?? 400;
    this.name = 'RequestError';
  }
}

export default RequestError;
