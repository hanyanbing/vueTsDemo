// translate router.meta.title, be used in breadcrumb sidebar tagsview
export default function(this: any, title: string) {
  // 检查 key 是否存在
  const hasKey = this.$te('route.' + title);

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title);
    return translatedTitle;
  }
  return title;
}
