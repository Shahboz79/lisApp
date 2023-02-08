package com.lissoft.dao.impl;

import com.lissoft.dao.Dao;
import com.lissoft.entity.BaseEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public abstract class BaseDaoImpl<E extends BaseEntity> implements Dao<E> {

    protected final Log log = LogFactory.getLog(getClass());

    @PersistenceContext
    private EntityManager entityManager;

//    protected SessionFactory sessionFactory;

//    public SessionFactory getSessionFactory() {
//        return sessionFactory;
//    }

    Class<E> domainClass;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public BaseDaoImpl(Class objectClass) {
        this.domainClass = objectClass;
    }

    public void saveOrUpdate(E obj) {
        if (obj.getId() == null) {
            create(obj);
        } else {
            update(obj);
        }
    }

    public void create(E obj) {
        obj.setCreatedDate(new Date());
        getEntityManager().persist(obj);
    }

    public void update(E obj) {
        getEntityManager().merge(obj);
    }

    public void delete(E obj) {
        getEntityManager().remove(obj);
    }

    public E get(Number id) {
        if (id != null) {
            Session session = getEntityManager().unwrap(Session.class);
            if (session != null && session.isOpen() && session.isConnected()) {
                Query query = getEntityManager().createQuery("select d from " + domainClass.getSimpleName() + " d where d.id=" + id.toString());
                List resultList = query.getResultList();
                if (!resultList.isEmpty()) {
                    return (E) resultList.get(0);
                }
            }
        }
        return null;
    }

    @Override
    public List<E> get(List<Integer> ids) {
        if (!ids.isEmpty()) {
            return getEntityManager().createQuery("select e from " + domainClass + " e where e.id in :ids", domainClass)
                    .setParameter("ids", ids)
                    .getResultList();
        }
        return new ArrayList<>();
    }
}
