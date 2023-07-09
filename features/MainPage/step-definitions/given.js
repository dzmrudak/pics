import { Given } from '@wdio/cucumber-framework';
import goToUrl from '../support/actions/goToUrl';

Given(/^A web browser is at the "(Main)" page$/, page => {
    goToUrl(page);
});