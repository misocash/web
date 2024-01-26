import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { useWallet } from 'use-wallet'
import btnImgMenu from '../../assets/img/btnImgMenu.png'
import useSushi from '../../hooks/useSushi'
import { add, getMasterChefContract, getPoolLength, getWethContract } from '../../sushi/utils'

const Home: React.FC = () => {
  const wallet = useWallet()

  const sushi = useSushi()
  const onMint = async () => {
    if (sushi) {
      const wethContracts = getWethContract(sushi)
      await wethContracts.methods.deposit().send({from: wallet.account, value: 100000000000000000})
    }
  }

  const onAdd = async () => {
    if (sushi) {
      const masterChefContract = getMasterChefContract(sushi)
      const result = await getPoolLength(masterChefContract)
    }
  }

  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={120} alt="" />}
        title="miso"
        subtitle="Stake assets to claim your very own yummy MISO!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        <span role="img" aria-label="">🏆</span><b>Pro Tip</b>: MISO token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="See the Menu" to="/farms" variant="secondary"><MenuImg src={btnImgMenu} alt="" /></Button>

        {/* <div style={{ border:"1px solid red", padding: '10px', marginTop: 20}}>
          <div style={{fontWeight: 700, marginBottom: 6}}>Test button</div>
          <Button text="mint" onClick={onMint}></Button>
          <Button text="add" onClick={onAdd}></Button>
        </div> */}
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

const MenuImg = styled.img`
  width: 31px;
  height: 31px;
  margin-right: 10px;
`

export default Home
