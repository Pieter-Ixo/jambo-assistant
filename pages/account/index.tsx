import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useContext } from 'react';
import QRCode from 'react-qr-code';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import AddressActionButton from '@components/AddressActionButton/AddressActionButton';
import ImageWithFallback from '@components/ImageFallback/ImageFallback';
import TokenList from '@components/TokenList/TokenList';
import Wallets from '@components/Wallets/Wallets';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Loader from '@components/Loader/Loader';
import Modal from '@components/Modal/Modal';
import Head from '@components/Head/Head';
import { urlEncodeIbcDenom } from '@utils/encoding';
import { WalletContext } from '@contexts/wallet';
import useModalState from '@hooks/modalState';
import config from '@constants/config.json';
import { WALLETS } from '@constants/wallet';

const Account: NextPage = () => {
  const [QRVisible, showQR, hideQR] = useModalState(false);
  const { wallet, updateWalletType, logoutWallet } = useContext(WalletContext);

  const { push } = useRouter();
  const handleTokenClick = (denom: string) => push(`/account/${urlEncodeIbcDenom(denom)}`);

  return (
    <>
      <Head title='Account' description={config.siteDescriptionMeta} />

      <Header />

      <main className={cls(utilsStyles.main, utilsStyles.columnAlignCenter)}>
        {wallet.user && wallet.walletType ? (
          <>
            <div className={utilsStyles.usernameWrapper} onClick={logoutWallet}>
              {!!wallet.walletType && (
                <ImageWithFallback
                  src={WALLETS[wallet.walletType].img}
                  alt={WALLETS[wallet.walletType].name}
                  height={32}
                  width={32}
                  fallbackSrc='/images/chain-logos/fallback.png'
                />
              )}
              <h3 className={utilsStyles.username}>{wallet.user?.name ?? 'Hi'}</h3>
            </div>
            <div className={utilsStyles.spacer1} />
            <AddressActionButton
              address={wallet.user.address}
              shortAddress
              copyOrQr='qr'
              allowChainChange
              onCopyOrQrClick={showQR}
              walletType={wallet.walletType}
            />
            <div className={utilsStyles.spacer3} />
            <TokenList onTokenClick={handleTokenClick} />
            {QRVisible && (
              <Modal onClose={hideQR}>
                <div className={utilsStyles.columnAlignCenter}>
                  <div className={utilsStyles.spacer1} />
                  <sub>...IN PROGRESS...</sub>
                  <div className={utilsStyles.spacer1} />
                  <QRCode value={wallet.user.address} size={150} />
                  <div className={utilsStyles.spacer3} />
                  <AddressActionButton address={wallet.user.address} copyOrQr='copy' onCopyOrQrClick={showQR} />
                  <div className={utilsStyles.spacer1} />
                </div>
              </Modal>
            )}
          </>
        ) : wallet.walletType && !wallet.user ? (
          <>
            <div className={utilsStyles.spacer3} />
            <Loader size={50} />
          </>
        ) : (
          <Wallets onSelected={updateWalletType} />
        )}
      </main>
      <Footer showAccountButton showActionsButton />
    </>
  );
};

export default Account;