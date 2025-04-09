/* eslint-disable camelcase */
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

import AnalyticsConversionRates from '@/components/analytics/AnalyticsConversionRates';
import AnalyticsCurrentSubject from '@/components/analytics/AnalyticsCurrentSubject';
import AnalyticsCurrentVisits from '@/components/analytics/AnalyticsCurrentVisits';
import AnalyticsNews from '@/components/analytics/AnalyticsNews';
import AnalyticsOrderTimeline from '@/components/analytics/AnalyticsOrderTimeline';
import AnalyticsTasks from '@/components/analytics/AnalyticsTasks';
import AnalyticsTrafficBySite from '@/components/analytics/AnalyticsTrafficBySite';
import AnalyticsWebsiteVisits from '@/components/analytics/AnalyticsWebsiteVisits';
import AnalyticsWidgetSummary from '@/components/analytics/AnalyticsWidgetSummary';
import { mock_posts, mock_tasks, mock_timeline } from '@/lib/_mock';

// ----------------------------------------------------------------------

// Constants
const CONVERSATION_ORDER_CHARTS = {
  categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
  series: [
    { name: '2022', data: [44, 55, 41, 64, 22] },
    { name: '2023', data: [53, 32, 33, 52, 13] },
  ],
};
const WIDGET_SUMMARY_CHARTS = {
  weeklySales: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    series: [22, 8, 35, 50, 82, 84, 77, 12],
  },
  newUsers: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    series: [56, 47, 40, 62, 73, 30, 23, 54],
  },
  purchaseOrders: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    series: [40, 70, 50, 28, 70, 75, 7, 64],
  },
  messages: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    series: [56, 30, 23, 54, 47, 40, 62, 73],
  },
};
const WIDGET_SUMMARY_ICONS = {
  bag: '/assets/icons/glass/ic-glass-bag.svg',
  users: '/assets/icons/glass/ic-glass-users.svg',
  buy: '/assets/icons/glass/ic-glass-buy.svg',
  message: '/assets/icons/glass/ic-glass-message.svg',
};
const CURRENT_SUBJECT_CHARTS = {
  categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
  series: [
    { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
    { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
    { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
  ],
};
const WEBSITE_VISITS_CHARTS = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  series: [
    { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
    { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
  ],
};
const CURRENT_VISITS_CHARTS = {
  series: [
    { label: 'America', value: 3500 },
    { label: 'Asia', value: 2500 },
    { label: 'Europe', value: 1500 },
    { label: 'Africa', value: 500 },
  ],
};
const TRAFFIC_BY_SITE_LIST = [
  { value: 'facebook', label: 'Facebook', total: 323234 },
  { value: 'google', label: 'Google', total: 341212 },
  { value: 'linkedin', label: 'LinkedIn', total: 411213 },
  { value: 'twitter', label: 'Twitter', total: 443232 },
];

// ----------------------------------------------------------------------

function OverviewAnalyticsView(): React.ReactElement {
  return (
    <>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={CONVERSATION_ORDER_CHARTS}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Order timeline" list={mock_timeline} />
        </Grid>

        {/* -------------------------------- */}

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsWidgetSummary
            title="Weekly sales"
            percent={2.6}
            total={714000}
            icon={<Image width={64} height={64} src={WIDGET_SUMMARY_ICONS.bag} alt="icon" />}
            chart={WIDGET_SUMMARY_CHARTS.weeklySales}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsWidgetSummary
            title="New users"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<Image width={64} height={64} src={WIDGET_SUMMARY_ICONS.users} alt="icon" />}
            chart={WIDGET_SUMMARY_CHARTS.newUsers}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsWidgetSummary
            title="Purchase orders"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<Image width={64} height={64} src={WIDGET_SUMMARY_ICONS.buy} alt="icon" />}
            chart={WIDGET_SUMMARY_CHARTS.purchaseOrders}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="error"
            icon={<Image width={64} height={64} src={WIDGET_SUMMARY_ICONS.message} alt="icon" />}
            chart={WIDGET_SUMMARY_CHARTS.messages}
          />
        </Grid>

        {/* -------------------------------- */}

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject title="Current subject" chart={CURRENT_SUBJECT_CHARTS} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={WEBSITE_VISITS_CHARTS}
          />
        </Grid>

        {/* -------------------------------- */}

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="News" list={mock_posts.slice(0, 5)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits title="Current visits" chart={CURRENT_VISITS_CHARTS} />
        </Grid>

        {/* -------------------------------- */}

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Traffic by site" list={TRAFFIC_BY_SITE_LIST} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={mock_tasks} />
        </Grid>
      </Grid>
    </>
  );
}

export default OverviewAnalyticsView;
