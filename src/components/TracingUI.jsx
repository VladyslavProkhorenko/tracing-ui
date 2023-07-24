import React, { useEffect, useState } from 'react';
import TracingHeader from "./TracingHeader";
import TracingContent from "./TracingContent";
import "./../styles/TracingUI.scss";
import TracingSelector from "./TracingSelector";
import TracingUIService from "../services/TracingUI.service";
import TracingAuth from "./TracingAuth";
import TracingQueryService from "../services/TracingQuery.service";

const TracingUI = () => {
    const [ server, setServer ] = useState(null)
    const [ entities, setEntities ] = useState([]);
    const [ activeEntity, setActiveEntity ] = useState();
    const [ activeItem, setActiveItem ] = useState();
    const [ selectorVisible, setSelectorVisibility ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ traceItem, setTraceItem ] = useState(null);

    const hideSelector = () => setSelectorVisibility(false);
    const toggleSelector = () => setSelectorVisibility(!selectorVisible);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const loadActiveItem = async (item, selectedEntity) => {
        if (
            !selectedEntity || !Array.isArray(selectedEntity.items) ||
            !selectedEntity.items.find( child => child.key === item.key)
        ) {
            setActiveItem(null);
            setTraceItem(null);
            return;
        }

        setActiveItem(item);
        const data = await TracingUIService.loadItemDetails(item.key)
        setTraceItem(data);
    }

    const refresh = async () => {
        if (!server) return;

        startLoading();
        const entities = await TracingUIService.loadEntities();
        setEntities(entities);

        if (!entities || !entities.length) {
            setActiveEntity(null);
            setActiveItem(null);
            setTraceItem(null);
        }

        if (activeItem) {
            await loadActiveItem(activeItem, activeEntity)
        }
        stopLoading();
    }

    const updateServer = (server) => {
        setServer(server);
        TracingUIService.server = server;
    }

    const changeServer = () => {
        updateServer(null);
    }

    const fetchDataFromQuery = async () => {
        if (await fetchEntityFromQuery()) {
            await fetchItemFromQuery();
        }
    }

    const fetchEntityFromQuery = async () => {
        const entityKey = TracingQueryService.get('entity');
        if (!entityKey) return false;

        const entity = await TracingUIService.loadEntityDetails(entityKey);
        if (!entity) return false;

        setActiveEntity(entity);

        return entity;
    }

    const fetchItemFromQuery = async () => {
        const itemKey = TracingQueryService.get('key');
        if (!itemKey) return false;

        const item = await TracingUIService.loadItemDetails(itemKey);
        if (!item) return false;

        setActiveItem(item);
        setTraceItem(item);

        return item;
    }

    useEffect( async() => {
        if (await TracingUIService.auth(window.location.host)) {
            updateServer(TracingUIService.server);
            await fetchDataFromQuery();
        }
    }, []);

    useEffect( async () => {
        await refresh();
    }, [ server ]);
    
    return (
        <div className={`tracing-ui ${selectorVisible ? "selector-visible" : ""}`}>
            {
                server &&
                <>
                    <TracingHeader onSelectorToggle={toggleSelector}
                                   activeEntity={activeEntity}
                                   server={server}
                                   onRefresh={refresh}
                                   onServerChange={changeServer}
                    />
                    <TracingSelector status={selectorVisible}
                                     onHide={hideSelector}
                                     activeEntity={activeEntity}
                                     setActiveEntity={setActiveEntity}
                                     activeItem={activeItem}
                                     setActiveItem={loadActiveItem}
                                     entities={entities}
                    />
                    <TracingContent loading={loading}
                                    traceItem={traceItem}
                    />
                    <div className="backdrop" onClick={hideSelector}/>
                </>
            }
            {
                !server && <TracingAuth updateServer={updateServer} />
            }
        </div>
    );
};

export default TracingUI;
