//package com.example.springsduty.config;
//
//import com.alibaba.druid.filter.Filter;
//import com.alibaba.druid.filter.config.ConfigFilter;
//import com.alibaba.druid.filter.stat.StatFilter;
//import com.alibaba.druid.pool.DruidDataSource;
//import com.alibaba.druid.support.http.StatViewServlet;
//import com.alibaba.druid.wall.WallConfig;
//import com.alibaba.druid.wall.WallFilter;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.web.servlet.ServletRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.jdbc.datasource.DataSourceTransactionManager;
//
//import javax.sql.DataSource;
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * Druid配置
// *
// */
//@Configuration
//public class DruidConfig {
//
//    private Logger logger = LoggerFactory.getLogger(DruidConfig.class);
//
//    @Value("${datasource.url:#{null}}")
//    private String dbUrl;
//    @Value("${datasource.username: #{null}}")
//    private String username;
//    @Value("${datasource.password:#{null}}")
//    private String password;
//    @Value("${datasource.driverClassName:#{null}}")
//    private String driverClassName;
//    @Value("${datasource.initialSize:#{null}}")
//    private Integer initialSize;
//    @Value("${datasource.minIdle:#{null}}")
//    private Integer minIdle;
//    @Value("${datasource.maxActive:#{null}}")
//    private Integer maxActive;
//    @Value("${datasource.maxWait:#{null}}")
//    private Integer maxWait;
//    @Value("${datasource.timeBetweenEvictionRunsMillis:#{null}}")
//    private Integer timeBetweenEvictionRunsMillis;
//    @Value("${datasource.minEvictableIdleTimeMillis:#{null}}")
//    private Integer minEvictableIdleTimeMillis;
//    @Value("${datasource.validationQuery:#{null}}")
//    private String validationQuery;
//    @Value("${datasource.testWhileIdle:#{null}}")
//    private Boolean testWhileIdle;
//    @Value("${datasource.testOnBorrow:#{null}}")
//    private Boolean testOnBorrow;
//    @Value("${datasource.testOnReturn:#{null}}")
//    private Boolean testOnReturn;
//    @Value("${datasource.poolPreparedStatements:#{null}}")
//    private Boolean poolPreparedStatements;
//    @Value("${datasource.maxPoolPreparedStatementPerConnectionSize:#{null}}")
//    private Integer maxPoolPreparedStatementPerConnectionSize;
//    @Value("${datasource.filters:#{null}}")
//    private String filters;
//    @Value("${datasource.connectionProperties:#{null}}")
//    private String connectionProperties;
//
//    @Bean     //声明其为Bean实例
//    @Primary  //在同样的DataSource中，首先使用被标注的DataSource
//    public DataSource dataSource(){
//        DruidDataSource datasource = new DruidDataSource();
//
//        datasource.setUrl(this.dbUrl);
//        datasource.setUsername(username);
//        datasource.setPassword(password);
//        datasource.setDriverClassName(driverClassName);
//        //configuration
//        if(initialSize != null) {
//            datasource.setInitialSize(initialSize);
//        }
//        if(minIdle != null) {
//            datasource.setMinIdle(minIdle);
//        }
//        if(maxActive != null) {
//            datasource.setMaxActive(maxActive);
//        }
//        if(maxWait != null) {
//            datasource.setMaxWait(maxWait);
//        }
//        if(timeBetweenEvictionRunsMillis != null) {
//            datasource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
//        }
//        if(minEvictableIdleTimeMillis != null) {
//            datasource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
//        }
//        if(validationQuery!=null) {
//            datasource.setValidationQuery(validationQuery);
//        }
//        if(testWhileIdle != null) {
//            datasource.setTestWhileIdle(testWhileIdle);
//        }
//        if(testOnBorrow != null) {
//            datasource.setTestOnBorrow(testOnBorrow);
//        }
//        if(testOnReturn != null) {
//            datasource.setTestOnReturn(testOnReturn);
//        }
//        if(poolPreparedStatements != null) {
//            datasource.setPoolPreparedStatements(poolPreparedStatements);
//        }
//        if(maxPoolPreparedStatementPerConnectionSize != null) {
//            datasource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
//        }
//        if(connectionProperties != null) {
//            datasource.setConnectionProperties(connectionProperties);
//        }
//
//        List<Filter> filters = new ArrayList<>();
////        filters.add(configFilter());
////        filters.add(statFilter());
//        //filters.add(wallFilter());
//
//        datasource.setProxyFilters(filters);
//
//        return datasource;
//    }
//
//    //druid监控页面servlet
//    @Bean
//    public ServletRegistrationBean druidServlet() {
//        ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean();
//        servletRegistrationBean.setServlet(new StatViewServlet());
//        servletRegistrationBean.addUrlMappings("/druid/*");
//        return servletRegistrationBean;
//    }
//
//    //统计监控信息
//    @Bean
//    public StatFilter statFilter(){
//        StatFilter statFilter = new StatFilter();
//        statFilter.setLogSlowSql(true);
//        statFilter.setMergeSql(true);
//        statFilter.setSlowSqlMillis(1000);
//
//        return statFilter;
//    }
//
//    //sql防火墙
//    @Bean
//    public WallFilter wallFilter(){
//        WallFilter wallFilter = new WallFilter();
//
//        //允许执行多条SQL
//        WallConfig config = new WallConfig();
//        config.setMultiStatementAllow(true);
//        wallFilter.setConfig(config);
//
//        return wallFilter;
//    }
//
//    //密码解密
//    @Bean
//    public ConfigFilter configFilter() {
//        ConfigFilter configFilter = new ConfigFilter();
//        return configFilter;
//    }
//
//
//    //事务管理器
//    @Bean
//    @Primary
//    public DataSourceTransactionManager transactionManager() {
//        return new DataSourceTransactionManager(dataSource());
//    }
//}
