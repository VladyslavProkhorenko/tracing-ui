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
    const [ entitySteps, setEntitySteps ] = useState([]);
    const [ activeEntity, setActiveEntity ] = useState();
    const [ activeItem, setActiveItem ] = useState();
    const [ selectorVisible, setSelectorVisibility ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ traceItem, setTraceItem ] = useState(null);

    const hideSelector = () => setSelectorVisibility(false);
    const toggleSelector = () => setSelectorVisibility(!selectorVisible);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const loadActiveItem = async (item, selectedEntity) => {
        if (
            !selectedEntity || !Array.isArray(selectedEntity.items) ||
            !selectedEntity.items.find( child => child.id === item.id)
        ) {
            setActiveItem(null);
            setTraceItem(null);
            return;
        }

        setActiveItem(item);
        const data = await TracingUIService.loadItemDetails(item.id)
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
        console.log('fetch data from query');

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
        const itemId = TracingQueryService.get('id');
        if (!itemId || !Number(itemId)) return false;

        const item = await TracingUIService.loadItemDetails(itemId);
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

    useEffect( async () => {
        const steps = activeEntity
            ? await TracingUIService.loadStepsForEntity(activeEntity.id)
            : [];

        setEntitySteps(steps);
    }, [ activeEntity ]);
    
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
                                     entitySteps={entitySteps}
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
