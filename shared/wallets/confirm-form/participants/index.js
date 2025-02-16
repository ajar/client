// @flow
import * as React from 'react'
import * as Kb from '../../../common-adapters'
import * as Styles from '../../../styles'
import {ParticipantsRow, AccountEntry} from '../../common'
import type {CounterpartyType} from '../../../constants/types/wallets'

export type ParticipantsProps = {|
  recipientType: CounterpartyType,
  yourUsername: string,
  fromAccountIsDefault: boolean,
  fromAccountName: string,
  fromAccountAssets: string,
  // Must have a recipient user, stellar address, or account
  recipientUsername?: string,
  recipientFullName?: string,
  recipientStellarAddress?: string,
  recipientAccountName?: string,
  recipientAccountIsDefault?: boolean,
  recipientAccountAssets?: string,
|}

const Participants = (props: ParticipantsProps) => {
  let toFieldContent

  switch (props.recipientType) {
    case 'keybaseUser':
      if (!props.recipientUsername) {
        throw new Error('Recipient type keybaseUser requires prop recipientUsername')
      }
      toFieldContent = (
        <Kb.ConnectedNameWithIcon
          colorFollowing={true}
          horizontal={true}
          username={props.recipientUsername}
          metaOne={props.recipientFullName}
          avatarStyle={styles.avatar}
          onClick="tracker"
        />
      )
      break
    case 'stellarPublicKey':
      if (!props.recipientStellarAddress) {
        throw new Error('Recipient type stellarPublicKey requires prop recipientStellarAddress')
      }
      toFieldContent = (
        <React.Fragment>
          <Kb.Icon type="icon-stellar-logo-16" style={Kb.iconCastPlatformStyles(styles.stellarIcon)} />
          <Kb.Text type="BodySemibold" style={styles.stellarAddressConfirmText}>
            {props.recipientStellarAddress}
          </Kb.Text>
        </React.Fragment>
      )
      break
    case 'otherAccount':
      if (!props.recipientAccountName || !props.recipientAccountAssets) {
        throw new Error(
          'Recipient type otherAccount requires props recipientAccountName and recipientAccountAssets'
        )
      }
      toFieldContent = (
        <AccountEntry
          contents={props.recipientAccountAssets}
          isDefault={props.recipientAccountIsDefault}
          keybaseUser={props.yourUsername}
          name={props.recipientAccountName}
        />
      )
      break
  }

  return (
    <Kb.Box2 direction="vertical" fullWidth={true}>
      <ParticipantsRow heading="From">
        <AccountEntry
          contents={props.fromAccountAssets}
          isDefault={props.fromAccountIsDefault}
          keybaseUser={props.yourUsername}
          name={props.fromAccountName}
        />
      </ParticipantsRow>
      <ParticipantsRow heading="To" bottomDivider={false}>
        {toFieldContent}
      </ParticipantsRow>
    </Kb.Box2>
  )
}

const styles = Styles.styleSheetCreate({
  avatar: {
    marginRight: 8,
  },
  stellarAddressConfirmText: Styles.platformStyles({
    isElectron: {
      wordBreak: 'break-all',
    },
  }),
  stellarIcon: {
    alignSelf: 'flex-start',
    marginRight: Styles.globalMargins.xxtiny,
  },
})

export default Participants
