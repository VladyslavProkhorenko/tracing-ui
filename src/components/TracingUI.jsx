import React, { useEffect, useState } from 'react';
import TracingHeader from "./TracingHeader";
import TracingContent from "./TracingContent";
import "./../styles/TracingUI.scss";
import TracingSelector from "./TracingSelector";
import TracingUIService from "../services/TracingUI.service";
import TracingAuth from "./TracingAuth";

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
                                   setActiveEntity={setActiveEntity}
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
