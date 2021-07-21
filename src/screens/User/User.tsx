import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CustomerContainer from '../../containers/Customer/CustomerContainer';
import SubscriptionContainer from '../../containers/Subscription/Subscription';
import useBreakpoint, { Breakpoint } from '../../hooks/useBreakpoint';
import Button from '../../components/Button/Button';
import Account from '../../components/Account/Account';
import Payment from '../../components/Payment/Payment';
import AccountCircle from '../../icons/AccountCircle';
import Favorite from '../../icons/Favorite';
import BalanceWallet from '../../icons/BalanceWallet';
import Exit from '../../icons/Exit';
import { AccountStore } from '../../stores/AccountStore';

import styles from './User.module.scss';

const User = (): JSX.Element => {
  const { t } = useTranslation('user');
  const breakpoint = useBreakpoint();
  const isLargeScreen = breakpoint >= Breakpoint.md;
  const customer = AccountStore.useState((state) => state.user);

  if (!customer) {
    return <div className={styles.user}>Open login panel?</div>;
  }

  return (
    <div className={styles.user}>
      {isLargeScreen && (
        <div className={styles.leftColumn}>
          <div className={styles.panel}>
            <ul>
              <li>
                <Button to="/u/my-account" label={t('nav.account')} variant="text" startIcon={<AccountCircle />} className={styles.button} />
              </li>
              <li>
                <Button to="/u/favorites" label={t('nav.favorites')} variant="text" startIcon={<Favorite />} className={styles.button} />
              </li>
              <li>
                <Button to="/u/payments" label={t('nav.payments')} variant="text" startIcon={<BalanceWallet />} className={styles.button} />
              </li>
              <li className={styles.logoutLi}>
                <Button to="/u/logout" label={t('nav.logout')} variant="text" startIcon={<Exit />} className={styles.button} />
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className={styles.mainColumn}>
        <Switch>
          <Route path="/u/my-account">
            <CustomerContainer>
              {({ customer, onUpdateEmailSubmit, onUpdateInfoSubmit }) => (
                <Account
                  customer={customer}
                  onUpdateEmailSubmit={onUpdateEmailSubmit}
                  onUpdateInfoSubmit={onUpdateInfoSubmit}
                  panelClassName={styles.panel}
                  panelHeaderClassName={styles.panelHeader}
                  onDeleteAccountClick={() => console.error('Sure?')}
                />
              )}
            </CustomerContainer>
          </Route>
          <Route path="/u/favorites">
            <div>Favorites</div>
          </Route>
          <Route path="/u/payments">
            <SubscriptionContainer>
              {({ subscription, update }) => (
                <Payment
                  subscription={subscription}
                  onEditSubscriptionClick={update}
                  panelClassName={styles.panel}
                  panelHeaderClassName={styles.panelHeader}
                />
              )}
            </SubscriptionContainer>
          </Route>
          <Route path="/u/logout">
            <Redirect to="/" />
          </Route>
          <Route path="/u/:other?">
            <Redirect to="/u/my-account" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default User;