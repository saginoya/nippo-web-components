import { defineCustomElement } from 'vue'

// Components
import AreaHtml from './components/AreaHtml.ce.vue'
import BaseImage from './components/BaseImage.ce.vue'
import DnArticle from './components/DnArticle.ce.vue'
import DnList from './components/DnList.ce.vue'
import DnListHeader from './components/DnListHeader.ce.vue'
import DnSelectMonth from './components/DnSelectMonth.ce.vue'
import DnSubSummary from './components/DnSubSummary.ce.vue'
import DnSummary from './components/DnSummary.ce.vue'
import DnTag from './components/DnTag.ce.vue'
import DnTagCat from './components/DnTagCat.ce.vue'
import NpArticleContent from './components/NpArticleContent.ce.vue'
import NpArticleHeader from './components/NpArticleHeader.ce.vue'
import NpArticleHt from './components/NpArticleHt.ce.vue'
import NpArticleJk from './components/NpArticleJk.ce.vue'
import NpList from './components/NpList.ce.vue'
import NpSelectMonth from './components/NpSelectMonth.ce.vue'

const MyAreaHtml = defineCustomElement(AreaHtml)
const MyBaseImage = defineCustomElement(BaseImage)
const MyDnArticle = defineCustomElement(DnArticle)
const MyDnList = defineCustomElement(DnList)
const MyDnListHeader = defineCustomElement(DnListHeader)
const MyDnSelectMonth = defineCustomElement(DnSelectMonth)
const MyDnSubSummary = defineCustomElement(DnSubSummary)
const MyDnSummary = defineCustomElement(DnSummary)
const MyDnTag = defineCustomElement(DnTag)
const MyDnTagCat = defineCustomElement(DnTagCat)
const MyNpArticleContent = defineCustomElement(NpArticleContent)
const MyNpArticleHeader = defineCustomElement(NpArticleHeader)
const MyNpArticleHt = defineCustomElement(NpArticleHt)
const MyNpArticleJk = defineCustomElement(NpArticleJk)
const MyNpList = defineCustomElement(NpList)
const MyNpSelectMonth = defineCustomElement(NpSelectMonth)

customElements.define('area-html', MyAreaHtml)
customElements.define('base-image', MyBaseImage)
customElements.define('dn-article', MyDnArticle)
customElements.define('dn-list', MyDnList)
customElements.define('dn-list-header', MyDnListHeader)
customElements.define('dn-select-month', MyDnSelectMonth)
customElements.define('dn-sub-summary', MyDnSubSummary)
customElements.define('dn-summary', MyDnSummary)
customElements.define('dn-tag', MyDnTag)
customElements.define('dn-tag-cat', MyDnTagCat)
customElements.define('np-article-content', MyNpArticleContent)
customElements.define('np-article-header', MyNpArticleHeader)
customElements.define('np-article-ht', MyNpArticleHt)
customElements.define('np-article-jk', MyNpArticleJk)
customElements.define('np-list', MyNpList)
customElements.define('np-select-month', MyNpSelectMonth)
