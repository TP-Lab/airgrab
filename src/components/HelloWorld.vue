<template>
  <div class="hello">
    <p class="intro">{{$t('i18nView.text')}}</p>
      <!-- <div id="divselect">
          <em>请选择账号</em>
          <ul class="account-ul">
          </ul>
      </div>  -->
      <div class="current-account">{{$t('i18nView.account')}}：{{currentAccount}}</div>
      <div class="air-item" v-for="(item, index) in grabList">
        <div class="title">
          <img class="logo" :src="item.logo" >
          <div class="base-info">
            <span class="symbol">{{item.symbol}}</span><br>
            <a class="website" :href="item.website">{{item.website}}</a>
          </div>
          <span class="balance">
            <button v-if="item.valid" class="grab-btn" @click="grab(index)">AirGrab</button>
            <span v-else>{{item.balance}}</span>
          </span>
        </div>
        <hr>
        <div class="desc"><span class="label-title">{{$t('i18nView.synopsis')}}:</span> {{item.description}}</div>
        <div v-if="item.keywords" ><span class="label-title">{{$t('i18nView.keyword')}}:</span> {{item.keywords}}</div>
        <div></div>
      </div>
      <p class="intro">{{$t('i18nView.data')}}：https://eostoolkit.io/airgrab </p>
  </div>
</template>

<script>
import tp from "tp-eosjs";
import _ from 'lodash';

export default {
  name: "HelloWorld",
  data() {
    return {
      currentAccount: "",
      currentAddress: '',
      grabList: [
          {
            symbol: "INF",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_infinicoinio_INF.png',
            description:
              "Infiniverse is a decentralized augmented reality platform and virtual world on top of the real world. Infinicoin lets you register land and transact on the Infiniverse marketplace.",
            website: "https://www.infiniverse.net/",
            keywords: '1:1 Airgrab, ' + this.$t('i18nView.infSnapshot'),
            contract: "infinicoinio",
            claimKey: 'owner',
            actionName: "open",
            data: {
              symbol: "4,INF"
            },
            valid: true,
            balance: ''
          },
          {
            symbol: "DEOS",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_thedeosgames_DEOS.png',
            description:
              "Play zero house edge, provably fair and truly decentralized games. All EOS Token holders can get their DEOS tokens by 1:1 rate",
            website: "https://deosgames.com/",
            keywords: this.$t('i18nView.genesis') + ',' + this.$t('i18nView.deosSnapshot'),
            contract: "thedeosgames",
            claimKey: 'owner',
            actionName: "claim",
            data: {
              quantity: "0.0000 DEOS"
            },
            valid: true,
            balance: ''
          },
          {
            symbol: "ATD",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_eosatidiumio_ATD.png',
            description:
              "Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!",
            website: "https://www.atidium.io/",
            keywords: this.$t('i18nView.genesis') + ',' + this.$t('i18nView.atdRatio'),
            contract: "eosatidiumio",
            claimKey: 'owner',
            actionName: "signup",
            data: {
              quantity: "0.0000 ATD"
            },
            valid: true,
            balance: ''
          },

          {
            symbol: "WIZZ",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_wizznetwork1_WIZZ.png',
            description:
              "Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!",
            website: "https://wizz.network/",
            contract: "wizznetwork1",
            claimKey: 'owner',
            actionName: "signup",
            data: {
              quantity: "0.0000 WIZZ"
            },
            valid: true,
            balance: ''
          },
          {
            symbol: "POOR",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_poormantoken_POOR.png',
            description:
              "A reward for people who STAKE and VOTE for EOS Block Producers with MONTHLY drops.",
            keywords: '',
            website: "https://eostoolkit.io/airgrab",
            contract: "poormantoken",
            claimKey: 'owner',
            actionName: "signup",
            data: {
              quantity: "0.0000 POOR"
            },
            valid: true,
            balance: ''
          },
          {
            symbol: "DICE",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_betdicetoken_DICE.png',
            description:
              "Trustworthy, cost-free and pair EOS dice betting platform. Sign up for 1000 DICE",
            website: "https://betdice.one/",
            keywords: this.$t('i18nView.finished'),
            contract: "betdicetoken",
            claimKey: 'owner',
            actionName: "signup",
            data: {
              quantity: "1000.0000 DICE"
            },
            valid: false,
            balance: ''
          },
          {
            symbol: "RIDL",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_ridlridlcoin_RIDL.png',
            description:
              "Support Scatter and trustless reputation on blockchain.",
            keywords: this.$t('i18nView.finished'),
            website: "https://ridl.get-scatter.com",
            contract: "ridlridlcoin",
            claimKey: 'claimer',
            actionName: "claim",
            data: {},
            valid: false,
            balance: ''
          },
          {
            symbol: "TRYBE",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_trybenetwork_TRYBE.png',
            description:
              "A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.",
            keywords: this.$t('i18nView.finished'),
            website: "https://trybe.one",
            contract: "trybenetwork",
            claimKey: 'claimer',
            actionName: "claim",
            data: {},
            valid: false,
            balance: ''
          },
          {
            symbol: "SEVEN",
            logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_xxxsevensxxx_SEVEN.png',
            description:
              "Sign Up and use your RAM (0.22kb) for receiving 10,000 SEVEN Tokens",
            website: "https://www.se7ens.io/",
            keywords: this.$t('i18nView.finished'),
            contract: "xxxsevensxxx",
            claimKey: 'owner',
            actionName: "signup",
            data: {
              quantity: "10000.0000 SEVEN"
            },
            valid: false,
            balance: ''
          }
        ]

    };
  },

  computed: {

  },

  created() {
    tp.getCurrentWallet().then(res => {
      if (res.result) {
        this.currentAccount = res.data.name;
        this.currentAddress = res.data.address;

        this.getUserInfo();
      }
    });

  },

  methods: {
    grab(index) {
      let grabInfo = this.grabList[index];

      let extendsData = {};
      extendsData[grabInfo.claimKey] = this.currentAccount;

      if (grabInfo.symbol === 'INF') {
        extendsData['ram_payer'] = this.currentAccount;
      }

      tp.pushEosAction({
        actions: [
            {
                account: grabInfo.contract,
                name: grabInfo.actionName,
                authorization: [{
                    actor: this.currentAccount,
                    permission: 'active'
                }],
                data: _.assignIn(grabInfo.data, extendsData)
            }
        ],
        account: this.currentAccount,
        address: this.currentAddress
      }).then(res => {
        if (res.result) {
          Dialog.init(this.$t('i18nView.successTip'));
          this.getUserInfo();
        } else {
          Dialog.init(this.$t('i18nView.failTip'));
          this.getUserInfo();
        }
      });
    },

    getUserInfo() {
      let grabList = this.grabList;
      _.forEach(grabList, item => {
        let params = {
          account: this.currentAccount,
          contract: item.contract,
          symbol: item.symbol
        };
        tp.getEosBalance(params).then(res => {
          if (res.result) {
            if (res.data.balance && res.data.balance.length) {
              item.valid = false;
              item.balance = res.data.balance[0];
            }
          }
        })
      });

      this.grabList = grabList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intro {
  font-size: 13px;
  padding: 0 10px;
  margin-bottom: 20px;
}
.air-item {
  border: 1px solid #f1f1f1;
  padding: 10px;
  margin: 10px 0 20px;
  font-size: 12px;
  background-color: #f9f9f9;

  background: linear-gradient(
    to right,
    rgb(250, 251, 252) 0%,
    rgb(243, 245, 247) 100%
  );

  box-shadow: 0 0 5px 0 #ddd;
}

.logo {
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
hr {
  border: none;
  border-bottom: 1px solid #eee;
}
.base-info {
  display: inline-block;
  vertical-align: middle
}

.current-account {
  font-size: 13px;
  color: #333;
}

div {
  line-height: 1.5;
}
.symbol {
  font-size: 14px;
  font-weight: bold;
}
.label-title {
  font-size: 12px;
  font-weight: bold;
}
.desc {
  margin-bottom: 5px;
}
.grab-btn {
  -webkit-appearance: none;
  border-radius: 2px;
  border: none;
  color: #fff;
  padding: 6px 13px;
  background: rgb(122, 188, 255); /* Old browsers */

  background: linear-gradient(
    to right,
    rgba(122, 188, 255, 1) 0%,
    rgba(96, 171, 248, 1) 46%,
    rgba(96, 171, 248, 1) 46%,
    rgba(64, 150, 238, 1) 100%
  );
}
.website {
  text-decoration: none;
  color: #3775dc;
}
.title {
  line-height: 30px;
  margin: 0 0 4px;
}

.balance {
  display: inline-block;
  float: right;
}

</style>
