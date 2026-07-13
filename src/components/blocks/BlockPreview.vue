<script setup>
import GlobalNavigationBlock from "./GlobalNavigationBlock.vue";
import ThesisHeroBlock from "./ThesisHeroBlock.vue";
import ImmediateProofBlock from "./ImmediateProofBlock.vue";
import ProductDemonstrationBlock from "./ProductDemonstrationBlock.vue";
import FeatureChapterBlock from "./FeatureChapterBlock.vue";
import CaseStudyBlock from "./CaseStudyBlock.vue";
import FaqBlock from "./FaqBlock.vue";
import FinalCtaBlock from "./FinalCtaBlock.vue";
import DeepFooterBlock from "./DeepFooterBlock.vue";
import ApplicationShellBlock from "./ApplicationShellBlock.vue";
import OperationalOverviewBlock from "./OperationalOverviewBlock.vue";
import CommandFilterBarBlock from "./CommandFilterBarBlock.vue";
import DataWorkspaceBlock from "./DataWorkspaceBlock.vue";
import DetailInspectorBlock from "./DetailInspectorBlock.vue";
import ActivityFeedBlock from "./ActivityFeedBlock.vue";
import FormWorkflowBlock from "./FormWorkflowBlock.vue";
import SchedulingWorkspaceBlock from "./SchedulingWorkspaceBlock.vue";
import SystemStatesBlock from "./SystemStatesBlock.vue";

// =============================================================================
// region BLOCK PREVIEW ROUTER
// =============================================================================

defineProps({ blockId: { type: String, required: true } });

const previews = {
  "global-navigation": GlobalNavigationBlock,
  "thesis-hero": ThesisHeroBlock,
  "immediate-proof": ImmediateProofBlock,
  "product-demonstration": ProductDemonstrationBlock,
  "feature-chapter": FeatureChapterBlock,
  "case-study": CaseStudyBlock,
  faq: FaqBlock,
  "final-cta": FinalCtaBlock,
  "deep-footer": DeepFooterBlock,
  "application-shell": ApplicationShellBlock,
  "operational-overview": OperationalOverviewBlock,
  "command-filter-bar": CommandFilterBarBlock,
  "data-workspace": DataWorkspaceBlock,
  "detail-inspector": DetailInspectorBlock,
  "activity-feed": ActivityFeedBlock,
  "form-workflow": FormWorkflowBlock,
  "scheduling-workspace": SchedulingWorkspaceBlock,
  "system-states": SystemStatesBlock,
};

// endregion BLOCK PREVIEW ROUTER
</script>

<template><component :is="previews[blockId]" /></template>
