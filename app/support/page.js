import {permanentRedirect} from 'next/navigation';
import {supportHome} from '../data/support';

export default function Support() {
  permanentRedirect(supportHome);
}
