import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'
import useAddEthChain from '../../hooks/useAddEthChain'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect, chainId, ethereum } = useWallet()
  const { addEthChain } = useAddEthChain()
  const wallet = useWallet()
  
  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])


  const onConnect = async () => {

    if (typeof window.ethereum === 'undefined') {
      // 提示用户安装 MetaMask 插件
      alert('Please install the MetaMask extension to use this feature.');
      return
    }
    
    // 请求切换到指定网络
    await addEthChain()
    
    await connect('injected')
  }


  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} alt="" />}
              onConnect={onConnect}
              title="Metamask"
            />
          </StyledWalletCard>
          <Spacer size="sm" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} alt="" />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`

export default WalletProviderModal
